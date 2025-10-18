import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { ErrorInputFormComponent } from "../../../shared/components/errorInputForm/errorInputForm.component";
import { ErrorsFormComponent } from "../../../shared/components/errors-form/errors-form.component";

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule, ErrorInputFormComponent, ErrorsFormComponent],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private  fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)],[this.formUtils.checkingServerResponse]],
    username: ['',[Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern), this.formUtils.notStrider]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]]
  },
  {
    validators : [
      this.formUtils.isFieldOneEqualsFieldTwo('password', 'password2')
    ]
  });



  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
 }
