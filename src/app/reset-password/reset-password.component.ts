import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {MustMatch} from '../shared/validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  isLoading = false;
  submitted = false;
  hideNewPassword = true;
  hideConfirmPassword = true;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    let resetToken = this.route.snapshot.params?.['token']
    if (resetToken) {
      this.resetPasswordForm.patchValue({resetToken});
    } else {
      // TODO: snackbar
    }
  }

  createForm(): void {
    this.resetPasswordForm = this.fb.group({
      resetToken: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  get f(): FormGroup["controls"] { return this.resetPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this.authService.resetPassword(this.resetPasswordForm.getRawValue()).subscribe({
        next: (res: {error: any; data: any; message: any;}) => {
          if (!res.error) {
            this.submitted = false;
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
