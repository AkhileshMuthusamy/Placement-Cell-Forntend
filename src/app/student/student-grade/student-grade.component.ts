import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss']
})
export class StudentGradeComponent implements OnInit {

  isLoading = false;
  studentMarks: any = [];

  constructor(private api: ApiService,) { }

  ngOnInit(): void {
    this.loadGrade();
  }

  loadGrade(): void {
    this.isLoading = true;
    this.api.getStudentGrade().subscribe({
      next: (res) => {
        this.isLoading = false;

        if(!res.error) {
          this.studentMarks = res.data;
        }
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

}
