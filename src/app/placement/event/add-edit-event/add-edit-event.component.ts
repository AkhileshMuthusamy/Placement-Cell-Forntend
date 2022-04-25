import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Editor, Toolbar, Validators as NgxValidator} from 'ngx-editor';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit, OnDestroy {

  eventForm!: FormGroup;
  isLoading = false;
  isFetchingSkillFromJD = false;
  submitted = false;
  minDate = new Date();
  editor: Editor = new Editor();
  html = '';

  isListLoading = false;
  departments: Array<string> = [];
  batches: Array<string> = [];

  skills: Array<string> = [];

  selectedFile!: File | undefined;
  validFileTypes: { [key: string]: string } = {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  };

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {formData: any, mode: string},
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
    this.eventForm.patchValue(data.formData);

    this.loadBatchList();
    this.loadDepartmentList();
    this.loadSkillList();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createForm(): void {
    this.eventForm = this.fb.group({
      _id: [],
      title: ['', Validators.required],
      body: ['', NgxValidator.required()],
      date: ['', Validators.required],
      minCgpa: [0, Validators.required],
      minHSMark: [0, Validators.required],
      skills: [undefined],
      jd: [''],
      remindAt: [],
      batch: [[]],
      department: [[]]
    });

  }

  get f(): any { return this.eventForm.controls; }

  loadSkillList(): void {
    this.isListLoading = true;
    this.api.getSkillList().subscribe({
      next: (res: APIResponse<Array<string>>) => {
        if (!res.error) {
          this.skills = res.data;
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

  loadDepartmentList(): void {
    this.isListLoading = true;
    this.api.getDepartmentList().subscribe({
      next: (res: APIResponse<Array<string>>) => {
        if (!res.error) {
          this.departments = res.data;
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

  loadBatchList(): void {
    this.isListLoading = true;
    this.api.getBatchList().subscribe({
      next: (res: APIResponse<Array<string>>) => {
        if (!res.error) {
          this.batches = res.data;
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

  get fileTypes() {
    return Object.keys(this.validFileTypes);
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

    console.log(this.selectedFile?.type);
    if (this.fileTypes.includes(this.selectedFile?.type || '')) {
      this.fetchSkillsFromJD();
    } else {
      this.resetState();
      this.snackBar.open('Invalid file type', 'Close', { duration: 2000 });
    }
  }

  getDateTimeString() {
    let current = new Date();
    let cDate = `${current.getFullYear()}` + `${(current.getMonth() + 1)}` + `${current.getDate()}`;
    let cTime = `${current.getHours()}` + `${current.getMinutes()}` + `${current.getSeconds()}`;
    let dateTime = cDate + cTime;
    console.log(dateTime);
    return dateTime;
}

  fetchSkillsFromJD(): void {
    if (this.selectedFile) {
      this.eventForm.controls['skills'].setValue([]);
      this.isFetchingSkillFromJD = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
    
      this.api.fetchSkillFromJD(formData).subscribe({
        next: (res: APIResponse<any>) => {
          this.eventForm.controls['skills'].setValue(res.data.skills);
          this.eventForm.controls['jd'].setValue(res.data.jd);
          this.isFetchingSkillFromJD = false;
        },
        complete: () => {},
        error: (err: {error: {message: any}}) => {
          this.isFetchingSkillFromJD = false;
        }
      });
    }
    this.resetState();
  }

  resetState(): void {
    this.selectedFile = undefined;
  }

  onSubmit(): void {

    this.submitted = true;
    this.eventForm.markAllAsTouched();  // Mark all the field as touched to show errors.

    if (this.eventForm.valid) {
      this.isLoading = true;

      if (this.data.mode === 'ADD') {
        this.api.addEvent(this.eventForm.getRawValue()).subscribe({
          next: (res: APIResponse<any>) => {
            if (!res.error) {
              this.submitted = false;
              this.dialogRef.close('SUCCESS');
            }
            this.isLoading = false;
          },
          complete: () => {},
          error: (err: {error: {message: any}}) => {
            this.isLoading = false;
          }
        });
      } else {
        this.api.editEvent(this.eventForm.getRawValue()).subscribe({
          next: (res: APIResponse<any>) => {
            if (!res.error) {
              this.submitted = false;
              this.dialogRef.close('SUCCESS');
            }
            this.isLoading = false;
          },
          complete: () => {},
          error: (err: {error: {message: any}}) => {
            this.isLoading = false;
          }
        });
      }
    }
  }

}
