import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  hide = true;
  isLoading = false;
  isSuccess = false;
  isMessage!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.createForm();
    this.authService.navigateUserHome();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (localStorage.getItem('rMe') !== null) {
      this.loginForm.patchValue(JSON.parse(localStorage.getItem('rMe') || '{}'));
    }
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log(this.loginForm.getRawValue())
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: (res: {error: any; data: any; message: any;}) => {
          if (!res.error) {
            this.submitted = false;
            this.authService.storeUserInfo(res.data);
            this.authService.isLoginSubject.next(true);
            this.navigate(res.data);
          } else {
            this.snackBar.open(res.message || 'Unable to login', 'Close', {duration: 2000});
          }
          this.isLoading = false;
        },
        complete: () => {},
        error: (err: {error: {message: any}}) => {
          this.isLoading = false;
          console.log(err);
          this.snackBar.open( err.error?.message || 'Error while connecting. Please try again.', 'Close', {duration: 2000});
        }
      });
    }
  }

  navigate(data: any): void {
    if (data.profile?.role === 'ADMIN') {
      this.router.navigate(['/admin']).then(() => {});
    } else if (data.profile?.role === 'FACULTY') {
      this.router.navigate(['/faculty']).then(() => {});
    } else if (data.profile?.role === 'PLACEMENT') {
      this.router.navigate(['/placement']).then(() => {});
    } else {
      this.snackBar.open( 'Internal error occurred. Please contact administrator', 'Close', {duration: 2000});
    }
  }
}
