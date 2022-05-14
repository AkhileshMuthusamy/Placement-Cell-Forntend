import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registrationForm!: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<RegisterUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type: string, title: string},
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();

    if (this.data.type === 'STUDENT') {
      this.registrationForm.controls['department'].setValidators(Validators.required);
      this.registrationForm.controls['batch'].setValidators(Validators.required);
      this.registrationForm.controls['sslcMark'].setValidators(Validators.required);
      this.registrationForm.controls['hsMark'].setValidators(Validators.required);
    }
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['',Validators.required],
      role: [this.data.type],
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

  get f(): any { return this.registrationForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.registrationForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.registrationForm.valid) {
      this.isLoading = true;
      let data = this.registrationForm.getRawValue();
      data['id'] = data['id'].toUpperCase();
      this.api.registerUser(data).subscribe({
        next: (res: {error: any; data: any; message: any;}) => {
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
