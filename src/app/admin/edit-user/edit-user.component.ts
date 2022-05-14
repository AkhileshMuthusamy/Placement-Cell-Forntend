import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';
import {DataService} from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm!: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {formData: any, title: string, type: string,},
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
    this.userForm.patchValue(data.formData);

    if (this.data.type === 'STUDENT') {
      this.userForm.controls['department'].setValidators(Validators.required);
      this.userForm.controls['batch'].setValidators(Validators.required);
      this.userForm.controls['sslcMark'].setValidators(Validators.required);
      this.userForm.controls['hsMark'].setValidators(Validators.required);
    }
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required],
      phone: [''],
      gender: ['', Validators.required],
      dateOfBirth: [null],
      skills: [],
      department: [],
      batch: [],
      sslcMark: [0],
      hsMark: [0]
    });

  }

  get f(): any { return this.userForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.userForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.userForm.valid) {
      this.isLoading = true;
      let requestData = {
        id: this.data.formData.id,
        data: this.userForm.getRawValue()
      }
      this.api.updateUser(requestData).subscribe({
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

  toggleUserStatus(): void {
    this.submitted = true;
    this.userForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.userForm.valid) {
      this.isLoading = true;
      let requestData = {
        id: this.data.formData.id,
        data: {disabled: !this.data.formData?.disabled}
      }
      this.api.updateUser(requestData).subscribe({
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
