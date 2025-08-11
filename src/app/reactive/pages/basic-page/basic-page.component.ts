import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // basicForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  basicForm : FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    price:[0,[Validators.required, Validators.min(10)]],
    inStorage:[0, [Validators.required, Validators.min(0)]]
  })

  onSave(){
    if(this.basicForm.invalid){
      this.basicForm.markAllAsTouched();
      return;
    }

    console.log(this.basicForm.value);

    this.basicForm.reset();
  }

 }
