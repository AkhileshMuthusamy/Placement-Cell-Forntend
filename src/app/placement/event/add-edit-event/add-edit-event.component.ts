import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Editor, Toolbar, Validators as NgxValidator} from 'ngx-editor';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit, OnDestroy {

  eventForm!: FormGroup;
  isLoading = false;
  submitted = false;
  minDate = new Date();
  editor: Editor = new Editor();
  html = '';

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

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

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createForm(): void {
    this.eventForm = this.fb.group({
      _id: [],
      title: ['', Validators.required],
      body: ['', NgxValidator.required()],
      date: ['', Validators.required],
      minCgpa: [0, Validators.required],
      remindAt: [],
    });

  }

  get f(): any { return this.eventForm.controls; }

  onSubmit(): void {

    this.submitted = true;
    this.eventForm.markAllAsTouched();  // Mark all the field as touched to show errors.

    if (this.eventForm.valid) {
      this.isLoading = true;

      if (this.data.mode === 'ADD') {
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
      } else {
        this.api.editEvent(this.eventForm.getRawValue()).subscribe({
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

}
