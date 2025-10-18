import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-errors-form',
  imports: [],
  templateUrl: './errors-form.component.html',
})
export class ErrorsFormComponent {
  form = input.required<FormGroup>();
  formUtils = FormUtils;
}
