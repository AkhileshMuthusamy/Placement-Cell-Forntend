import {Component, OnInit} from '@angular/core';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-faculty-activity',
  templateUrl: './faculty-activity.component.html',
  styleUrls: ['./faculty-activity.component.scss']
})
export class FacultyActivityComponent implements OnInit {

  isLoading = false;
  isListLoading = false;
  activities: Array<string> = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.isListLoading = true;
    this.api.getPastMarkUpload().subscribe({
      next: (res: APIResponse<any>) => {
        if (!res.error) {
          this.activities = res.data.sort().reverse();
        }
      },
      complete: () => {
        this.isListLoading = false;
      },
      error: () => {
        this.isListLoading = false;
      }
    });
  }

  deleteGrade(uploadedAt: string): void {
    this.isLoading = true;
    this.api.deletePastMarkUpload(uploadedAt).subscribe({
      next: (res: APIResponse<any>) => {
        if (!res.error) {
          this.loadList();
        }
      },
      complete: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
