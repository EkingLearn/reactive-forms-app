import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";
import { Signal, signal } from '@angular/core';
import { retry } from "rxjs";

async function sleep() {
  return new Promise( resolve => { setTimeout(() => {
    resolve(true)
  },2500)
  });
}

export class FormUtils{
  //Regular Expressions
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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

          case 'email':
            return 'El correo electronico ingresado no es valido';

          case 'pattern' :
            if(errors['pattern'].requiredPattern === this.namePattern)
            {
               return 'El campo debe contener nombre y apellido';
            }
            else if(errors['pattern'].requiredPattern === this.emailPattern)
            {
              return 'El valor ingresado no parece ser un correo valido';
            }
            else if(errors['pattern'].requiredPattern === this.notOnlySpacesPattern)
            {
              return 'Este campo no admite espacios en blanco';
            }

            return 'Error de patron contra expresión regular';

          case 'passwordsNotEqual' :
            return 'Las constraseñas no coinciden';

          case 'emailTaken':
            return 'Es correo electronico ya esta registrado';

          case 'notStrider':
            return 'No puede utilizar esa palabra como nombre de usuario';

          default:
            return `Error no controlado por el sistema: ${key}`;

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


  static getFormErrors( form : FormGroup ){
    if(!form.value) return null;

    const errors = form.errors ?? {};

    return this.getTextErrors(errors);
  }


  static isFieldOneEqualsFieldTwo(field1 : string, field2: string){
    return (formGroup : AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : {passwordsNotEqual:true}
    }
  }

  static async checkingServerResponse( control: AbstractControl): Promise<ValidationErrors | null>{

    await sleep();

    const formValue = control.value;

    if(formValue.toLowerCase() === "hola@mundo.com"){
      return {
        emailTaken : true,
      };
    }

    return null;

  }

 static notStrider(control : AbstractControl) : ValidationErrors | null
 {
  const formValue = control.value;
  if(formValue.toLowerCase() === "strider"){
    return {
      notStrider : true,
    };
  }

  return null;
 }
}
