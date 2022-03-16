import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  isLoading = false;
  submitted = false;
  hideOldPassword = true;
  hideNewPassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });

  }

  get f(): any { return this.changePasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      this.authService.changePassword(this.changePasswordForm.getRawValue()).subscribe({
        next: (res: {error: any; data: any; message: any;}) => {
          if (!res.error) {
            this.submitted = false;
            this.dialogRef.close();
            this.authService.logoutAndNavigate();
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
