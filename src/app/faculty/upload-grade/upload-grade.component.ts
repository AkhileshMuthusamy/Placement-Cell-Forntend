import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import readXlsxFile from 'read-excel-file';
import {ApiService} from 'src/app/shared/services/api.service';
import writeXlsxFile from 'write-excel-file';

export interface StudentGrade {
  id: string;
  name: string;
  semester: number;
  marks: Array<any>;
  previousGpa: Array<number>;
  previousGpaHeader: Array<string>;
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

  isVerifying = false;
  showFileList = false;
  selectedFile!: File | undefined;
  isLoading = false;
  hideDragNDrop = true;

  studentMarks: Array<StudentGrade> = [];
  headerRow: Array<string> = [];
  
  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.resetState();
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


  async downloadExcelFile(): Promise<void> {
    let dt = new Date()
    let filename = dt.toISOString().split('T')[0]

    const columns: any = [];

    const data: Array<any> = [];
    data.push(this.headerRow.map((header) => {
      return {
        value: header,
        fontWeight: 'bold'
      };
    }));

    for (let studentMark of this.studentMarks) {

      const obj: any = []
      obj.push({'value': studentMark.id});
      obj.push({'value': studentMark.name});
      studentMark.marks.forEach((mark) => {
        obj.push({'value': mark.mark});
      });
      studentMark.previousGpa.forEach((gpa, index) => {
        obj.push({'value': gpa});
      });
      obj.push({'value': studentMark.sgpa});
      obj.push({'value': studentMark.cgpa});

      data.push(obj);
    }

    console.log(data);

    await writeXlsxFile(data, {
      fileName: 'MarkSheet' + filename + '.xlsx'
    });
  }

  readExcelFile() {
    if (this.selectedFile) {
      
      readXlsxFile(this.selectedFile).then((rows) => {
        if (rows.length > 1) {
          this.headerRow = rows[0].map(_ => _.toString()); // <== Converting type Cell to Array
          const subjectStartIndex = 2;
          let subjectEndIndex = this.getSubjectEndIndex(this.headerRow);
          const semester = this.getSemester(this.headerRow);

          let subjects = this.headerRow.slice(subjectStartIndex, subjectEndIndex)
          console.log(subjects);


          // Iterate over student marks, skipping header
          for (let row of rows.slice(1)) {
            let obj: StudentGrade = {
              id: '',
              name: '',
              semester: 0,
              marks: [],
              sgpa: 0,
              cgpa: 0,
              previousGpa: [],
              previousGpaHeader: []
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

            obj['previousGpaHeader'] = this.headerRow.slice(numberOfSubjects + subjectStartIndex);
            for (let mark of row.slice(numberOfSubjects + subjectStartIndex)) {
              obj['previousGpa'].push(parseFloat(mark.toString()));
            }

            obj['sgpa'] = +((total / numberOfSubjects) / 9.5).toFixed(2)
            obj['cgpa'] = this.getCgpa(this.headerRow, row, obj['sgpa']);
            this.studentMarks.push(obj);
          }
          console.log(this.studentMarks);

          this.headerRow.push(...[`SGPA Sem-${semester}`, `CGPA Sem-${semester}`])
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
      this.isVerifying = true;
      const studentIds = this.studentMarks.map(student => student.id);
      
      this.api.verifyStudentID(studentIds).subscribe({
        next: (response) => {
          this.isVerifying = false;
          if (!response.error) {
            const missingIds = studentIds.filter(studentId => !response.data.includes(studentId));

            if (missingIds.length > 0) {
              this.snackBar.open('Invalid student id\'s: ' + missingIds.join(', '), 'Close', {
                duration: 10000,
              });
            } else {
              this.isLoading = true;
              this.api.uploadStudentMark(this.studentMarks).subscribe({
                next: (response) => {
                  this.isLoading = false;
                  if (!response.error) {
                    this.downloadExcelFile();
                    this.resetState();
                  }
                },
                error: () => {
                  this.resetState();
                  this.snackBar.open('Error while uploading file', 'Close', {
                    duration: 5000,
                  });
                }
              });
            }
          }
        },
        error: () => {
          this.resetState();
          this.snackBar.open('Error while verifying student id', 'Close', {
            duration: 5000,
          });
        }
      });
    }
  }

  resetState(): void {
    this.isVerifying = false;
    this.isLoading = false;
    this.showFileList = false;
    this.selectedFile = undefined;
    this.studentMarks = []
  }

}
