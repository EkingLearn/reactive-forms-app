import { Component, input, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-error-input-form',
  imports: [],
  templateUrl: './errorInputForm.component.html',
})
export class ErrorInputFormComponent {
  field = input.required<string>();
  form = input.required<FormGroup>();
  formUtils = FormUtils;
}
