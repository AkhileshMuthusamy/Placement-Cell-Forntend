import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {APIResponse} from '../objects/api-response';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiURL;
  private USER_TOKEN = 'uid';
  private USER_PROFILE = 'profile';

  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public getToken(): string {
    return localStorage.getItem(this.USER_TOKEN) || '';
  }

  hasUser(): boolean {
    return !!localStorage.getItem(this.USER_TOKEN);
  }

  public isUserLoggedIn(): boolean {
    return this.getToken() !== '';
  }

  getUserRoleFromJWTToken(): string | null {
    if (this.getToken()) {
      const [, payload, ] = this.getToken().split('.');
      // Convert payload from base64 to string, then parse it as JSON
      const role = JSON.parse(atob(payload))['role'];
      return role;
    }

    return null
  }

  getUserProfile(): any {
    let profile = JSON.parse(localStorage.getItem(this.USER_PROFILE) || '{}')
    return profile;
  }

  isAdmin(): boolean {
    return this.getUserRoleFromJWTToken() === 'ADMIN'
  }

  isFaculty(): boolean {
    return this.getUserRoleFromJWTToken() === 'FACULTY'
  }

  isStudent(): boolean {
    return this.getUserRoleFromJWTToken() === 'STUDENT'
  }

  isPlacement(): boolean {
    return this.getUserRoleFromJWTToken() === 'PLACEMENT'
  }

  login(data: any): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}login`, data);
  }

  forgotPassword(id: string): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}forgot-password`, {id});
  }

  resetPassword(data: any): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}reset-password`, data);
  }

  changePassword(data: any): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}change-password`, data);
  }

  storeUserInfo(data: {token: string; profile: any;}): void {
    localStorage.setItem(this.USER_TOKEN, data.token);
    localStorage.setItem(this.USER_PROFILE, JSON.stringify(data.profile));
  }

  logout(): void {
    localStorage.removeItem(this.USER_TOKEN);
    localStorage.removeItem(this.USER_PROFILE);
    this.isLoginSubject.next(false);
    this.snackBar.open('Token expired. Please login again.', 'Close', {duration: 2000});
    this.router.navigate(['/login']).then(() => {});
  }

  navigateUserHome(): void {
    let profile = JSON.parse(localStorage.getItem(this.USER_PROFILE) || '{}')
    if (profile?.role === 'ADMIN') {
      this.router.navigate(['/admin']).then(() => {});
    } else if (profile?.role === 'FACULTY') {
      this.router.navigate(['/faculty']).then(() => {});
    } else if (profile?.role === 'PLACEMENT') {
      this.router.navigate(['/placement']).then(() => {});
    } else if (profile?.role === 'STUDENT') {
      this.router.navigate(['/student']).then(() => {});
    }
  }

  public logoutAndNavigate(): void {
    localStorage.removeItem(this.USER_TOKEN);
    localStorage.removeItem(this.USER_PROFILE);
    this.router.navigate(['/login']).then(() => {});
    this.isLoginSubject.next(false);
  }
}
