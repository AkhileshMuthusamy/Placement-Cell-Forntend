import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {APIResponse} from '../shared/objects/api-response';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  id = new FormControl('', [Validators.required]);
  isLoading = false;
  submitted = false;


  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.id.valid) {
      this.isLoading = true;
      this.authService.forgotPassword(this.id.value).subscribe({
        next: (res: APIResponse<any>) => {
          console.log(res)
          if (!res.error) {
            this.submitted = false;
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
}
