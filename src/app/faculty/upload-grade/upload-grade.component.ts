import {HttpEvent, HttpEventType} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from 'src/app/shared/services/api.service';
import readXlsxFile from 'read-excel-file'
import writeXlsxFile from 'write-excel-file'

export interface StudentGrade {
  id: string;
  name: string;
  semester: number;
  marks: Array<any>;
  sgpa: number;
  cgpa: number;
}

@Component({
  selector: 'app-upload-grade',
  templateUrl: './upload-grade.component.html',
  styleUrls: ['./upload-grade.component.scss']
})
export class UploadGradeComponent implements OnInit {

  validFileTypes: Array<string> = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];

  progress = 0;
  showFileList = false;
  selectedFile!: File | undefined;
  isLoading = false;
  hideDragNDrop = true;

  studentMarks: Array<StudentGrade> = []
  
  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    if (event instanceof DragEvent) {
      this.selectedFile = event.dataTransfer?.files[0];
    } else {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }

    if (this.validFileTypes.includes(this.selectedFile?.type || '')) {
      this.showFileList = true;
      this.readExcelFile();
    } else {
      this.resetState();
      this.snackBar.open('Invalid file type', 'Close', { duration: 2000 });
    }
  }


  async downloadExcelFile(objects: any, schema: any, filename: string): Promise<void> {
    await writeXlsxFile(objects, {
      schema,
      fileName: filename + '.xlsx'
    });
  }

  readExcelFile() {
    if (this.selectedFile) {
      
      readXlsxFile(this.selectedFile).then((rows) => {
        console.log(rows)
        if (rows.length > 1) {
          let headerRow = rows[0];
          const subjectStartIndex = 2;
          let subjectEndIndex = this.getSubjectEndIndex(headerRow);
          const semester = this.getSemester(headerRow);
          

          let subjects: Array<string> = []
          for (let subject of headerRow.slice(subjectStartIndex, subjectEndIndex)) {
            subjects.push(subject.toString());
          }
          console.log(subjects);


          // Iterate over student marks, skipping header
          for (let row of rows.slice(1)) {
            let obj: StudentGrade = {
              id: '',
              name: '',
              semester: 0,
              marks: [],
              sgpa: 0,
              cgpa: 0
            }
            obj['id'] = row[0].toString();
            obj['name'] = row[1].toString();
            obj['semester'] = semester;
            let total = 0
            const numberOfSubjects = row.slice(subjectStartIndex, subjectEndIndex).length;
            for (let [index, mark] of row.slice(subjectStartIndex, subjectEndIndex).entries()) {
              let individualSubjectMark = { subject: '', mark: 0};
              individualSubjectMark.subject = subjects[index];
              individualSubjectMark.mark = parseFloat(mark.toString());
              total += parseFloat(mark.toString());
              obj['marks'].push({...individualSubjectMark});
            }
            // obj['total'] = total;
            obj['sgpa'] = +((total / numberOfSubjects) / 9.5).toFixed(2)
            obj['cgpa'] = this.getCgpa(headerRow, row, obj['sgpa']);
            console.log(obj);
            this.studentMarks.push(obj);
          }
          console.log(this.studentMarks);
        }
      });
    }
  }

  getSemester(headerRow: any): number {
    // Calculate the current semester
    let semester = 1;
    for (let [index, header] of headerRow.entries()) {
      if (typeof(header) === 'string') {

        if (header.toLowerCase().indexOf('sgpa') !== -1) {
          semester += 1;
        }
      }
    }

    return semester;
  }

  getCgpa(headerRow: any, studentRow: any, currentSgpa: number): number {
    // Calculate the current semester CGPA
    let previous_sgpa = 0
    let n = 1
    for (let [index, header] of headerRow.entries()) {
      if (typeof(header) === 'string') {
        if (header.toLowerCase().indexOf('sgpa') !== -1) {
          previous_sgpa += parseFloat(studentRow[index].toString());
          n += 1;
        }
      }
    }

    return  +((currentSgpa + previous_sgpa)/n).toFixed(2);
  }

  getSubjectEndIndex(headerRow: any): number {
    // Get index, where subject header ends
    for (let [index, header] of headerRow.entries()) {
      if (typeof(header) === 'string') {

        if (header.toLowerCase().indexOf('sgpa') !== -1) {
          return index
        }
      }
    }

    return headerRow.length;
  }

  uploadMark(): void {

    if (this.selectedFile) {

      const objects = [
        // Object #1
        {
          name: 'John Smith',
          dateOfBirth: new Date(),
        },
        // Object #2
        {
          name: 'Alice Brown',
          dateOfBirth: new Date(),
        }
      ]
      const schema = [
        // Column #1
        {
          column: 'Name',
          type: String,
          value: (student: any) => student.name
        },
        // Column #2
        {
          column: 'Date of Birth',
          type: Date,
          format: 'mm/dd/yyyy',
          value: (student: any) => student.dateOfBirth
        },
      ]
    }

    this.api.verifyStudentID(['F001', 'S003', 'S2']).subscribe({
      next: (response) => {
        
      },
      error: () => {
        this.resetState();
        this.snackBar.open('Error while uploading file', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  resetState(): void {
    this.showFileList = false;
    this.selectedFile = undefined;
    this.studentMarks = []
  }

}
