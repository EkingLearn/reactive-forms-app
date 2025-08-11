import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe, ReactiveFormsModule
  ],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  formUtils = FormUtils;
  private fb = inject(FormBuilder);

  myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ],[Validators.minLength(2)])

  });

  newFavoriteControl = new FormControl('',Validators.required)
 // newFavoriteControl = this.fb.control(['',Validators.required]);

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    if(this.newFavoriteControl.invalid) return;

    const newGame = this.newFavoriteControl.value;

    this.favoriteGames.push(new FormControl(newGame, Validators.required));
    this.newFavoriteControl.reset();
  }


  onDeleteFavorite(index: number){
    this.favoriteGames.removeAt(index);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
