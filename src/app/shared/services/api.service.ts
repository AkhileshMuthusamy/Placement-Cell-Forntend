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

  getProfile(): Observable<APIResponse<User>> {
    return this.http.get<APIResponse<User>>(`${this.apiURL}profile`)
  }

  getStudentGrade(): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.apiURL}student-grade`)
  }

  updateProfile(data: User): Observable<APIResponse<any>> {
    return this.http.put<any>(`${this.apiURL}profile`, data);
  }

  fetchUserList(role: Array<string>): Observable<APIResponse<Array<User>>> {
    return this.http.post<APIResponse<Array<User>>>(`${this.apiURL}list-user`, {role});
  }

  updateUser(data: {id: string, data: any}): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.apiURL}update-user`, data);
  }

  disableUser(ids: Array<string>): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.apiURL}disable-user`, {ids});
  }

  uploadStudentMark(data: any): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}upload-grade`, data);
  }

  verifyStudentID(data: Array<string>): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}upload-grade/verify`, {ids: data});
  }

  getPastMarkUpload(): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.apiURL}list-grade-upload`)
  }

  deletePastMarkUpload(uploadedAt: string): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.apiURL}delete-grade`, {uploadedAt})
  }

  fetchEventList(): Observable<APIResponse<Array<any>>> {
    return this.http.get<APIResponse<Array<any>>>(`${this.apiURL}event/list`);
  }

  addEvent(data: any): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.apiURL}event`, data);
  }

  editEvent(data: any): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.apiURL}event`, data);
  }

  deleteEvent(_id: string): Observable<APIResponse<any>> {
    return this.http.delete<APIResponse<any>>(`${this.apiURL}event?_id=${_id}`);
  }

  getSkillList(): Observable<APIResponse<Array<string>>> {
    return this.http.get<APIResponse<Array<string>>>(`${this.apiURL}skill`)
  }

  fetchSkillList(): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.apiURL}skill/list`)
  }

  addSkill(newSkill: string): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.apiURL}skill/add`, {name: newSkill})
  }

  deleteSkill(_id: string): Observable<APIResponse<any>> {
    return this.http.delete<APIResponse<any>>(`${this.apiURL}skill?_id=${_id}`)
  }

  getDepartmentList(): Observable<APIResponse<Array<string>>> {
    return this.http.get<APIResponse<Array<string>>>(`${this.apiURL}department`)
  }

  getBatchList(): Observable<APIResponse<Array<string>>> {
    return this.http.get<APIResponse<Array<string>>>(`${this.apiURL}batch`)
  }

  getSupportList(): Observable<APIResponse<Array<any>>> {
    return this.http.get<APIResponse<Array<any>>>(`${this.apiURL}skill/support`)
  }


  findStudentWithSkill(data: any): Observable<APIResponse<Array<User>>> {
    return this.http.post<APIResponse<Array<User>>>(`${this.apiURL}skill/student`, data)
  }

  sendSupportEmail(data: any): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.apiURL}skill/support`, data);
  }

  uploadResume(data: FormData): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.apiURL}resume`, data);
  }

  downloadResume(id: string): any {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };

    return this.http.get<any>(`${this.apiURL}resume?id=${id}`, httpOptions)
  }

}
