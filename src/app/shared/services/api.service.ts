import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {APIResponse} from '../objects/api-response';
import {User} from '../objects/global-objects';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }


  registerUser(data: any): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}register`, data);
  }

  getStudentList(): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.apiURL}student-list`);
  }

  getProfile(): Observable<APIResponse<User>> {
    return this.http.get<APIResponse<User>>(`${this.apiURL}profile`)
  }

  updateProfile(data: User): Observable<APIResponse<any>> {
    return this.http.put<any>(`${this.apiURL}profile`, data);
  }
}
