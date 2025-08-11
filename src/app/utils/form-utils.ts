import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils{

  static getTextErrors(errors: ValidationErrors){
    for(const key of Object.keys(errors))
    {
      switch(key){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres o elementos`;

        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
      }
    }

    return null;
  }

  static isInvalidField(form: FormGroup ,fildName: string): boolean | null {
    return !!form.controls[fildName].errors && form.controls[fildName].touched;
  }

  static getFieldError(form : FormGroup , fieldName : string) : string | null {

    if(!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextErrors(errors);
  }

  static isInvalidFieldInArray( formArray : FormArray,index:number){
    return(
       formArray.controls[index].errors && formArray.touched
    );
  }

  static getFieldErrorInArray ( formArray : FormArray, index: number)
  {
    if(formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};
     return this.getTextErrors(errors);

  }
}
