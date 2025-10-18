import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, count, Observable, ObservedValuesFromArray, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _baseUrl = "https://restcountries.com/v3.1";
  private _httpClient = inject(HttpClient);

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ]

  get regions():string[] {
    return [... this._regions];
  }

  getCountriesByRegions( region : string ) : Observable<Country[]> {
    if(!region ) return of([]);

    const url = `${this._baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this._httpClient.get<Country[]>(url);
  }

  getCountryByAlphaCode( alphaCode : string) : Observable<Country>{
     const url = `${this._baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this._httpClient.get<Country>(url);
  }

  getCountriesNamesByCodes(countryCodes: string[]):Observable<Country[]>{
    if(!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests : Observable<Country>[] = [];
    countryCodes.forEach( code =>{
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });
    return combineLatest( countriesRequests);
  }
}
