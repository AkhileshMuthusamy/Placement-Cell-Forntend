import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Editor, Toolbar, Validators as NgxValidator} from 'ngx-editor';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';
import {AuthService} from 'src/app/shared/services/auth.service';

interface SkillSupport {
  ids: Array<string>;
  skills: Array<string>;
  cgpa: number;
  batch: Array<string>;
  department: Array<string>;
  emails: Array<string>;
}

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  supportForm!: FormGroup;
  isLoading = false;
  submitted = false;
  minDate = new Date();
  editor: Editor = new Editor();
  html = '';

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
    private authService: AuthService,
    public dialogRef: MatDialogRef<SendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SkillSupport,
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
    console.log(data);
    this.supportForm.patchValue(data);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createForm(): void {
    this.supportForm = this.fb.group({
      subject: ['', Validators.required],
      body: ['', NgxValidator.required()],
      ids: [],
      performedBy: [this.authService.getUserProfile().id],
      skills: [[]],
      cgpa: [],
      batch: [[]],
      department: [[]],
      emails: [[]]
    });

  }

  get f(): any { return this.supportForm.controls; }

  onSubmit(): void {

    this.submitted = true;
    this.supportForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    console.log(this.supportForm.getRawValue());
    if (this.supportForm.valid) {
      this.isLoading = true;

      this.api.sendSupportEmail(this.supportForm.getRawValue()).subscribe({
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
