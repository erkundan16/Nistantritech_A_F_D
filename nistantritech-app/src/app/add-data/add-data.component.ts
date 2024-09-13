import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {
  dataForm: FormGroup;
  dataEntries: { datetime: Date, temperature: number }[] = [];

  constructor(private fb: FormBuilder) {
    this.dataForm = this.fb.group({
      datetime: ['', [Validators.required, this.pastDateValidator]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }

  pastDateValidator(control: any) {
    const date = new Date(control.value);
    return date < new Date() ? null : { invalidDate: true };
  }

  addData() {
    if (this.dataForm.valid) {
      this.dataEntries.push(this.dataForm.value);
      this.dataForm.reset();
    }
  }
}
