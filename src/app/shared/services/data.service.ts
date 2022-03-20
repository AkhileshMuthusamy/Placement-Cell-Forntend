import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIResponse} from '../objects/api-response';
import {User} from '../objects/global-objects';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private $isProfileLoading = false;

  private profile = new BehaviorSubject<User | null>(null);

  constructor(private api: ApiService) {
    this.loadProfile();
  }

  get isProfileLoading(): boolean {
    return this.$isProfileLoading;
  }

  public getProfile(): Observable<User | null> {
    return this.profile.asObservable();
  }

  loadProfile(): void {
    this.$isProfileLoading = true;
    this.api.getProfile().subscribe({
      next: (res: APIResponse<User>) => {
        if (!res.error) {
          this.profile.next(res.data);
        }
      },
      complete: () => {
        this.$isProfileLoading = false;
      },
      error: () => {
        this.$isProfileLoading = false;
      }
    });

  }
}
