import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {

  eventForm!: FormGroup;
  isLoading = false;
  submitted = false;
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {formData: any, mode: string},
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
    this.eventForm.patchValue(data.formData);
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      date: ['', Validators.required],
    });

  }

  get f(): any { return this.eventForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.eventForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.eventForm.valid) {
      this.isLoading = true;
      this.api.addEvent(this.eventForm.getRawValue()).subscribe({
        next: (res: APIResponse<any>) => {
          if (!res.error) {
            this.submitted = false;
            this.dialogRef.close('SUCCESS');
          }
          this.isLoading = false;
        },
        complete: () => {},
        error: (err: {error: {message: any}}) => {
          this.isLoading = false;
        }
      });
    }
  }

}
