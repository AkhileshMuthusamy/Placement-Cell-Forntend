import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';
import {DataService} from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-edit-student-profile',
  templateUrl: './edit-student-profile.component.html',
  styleUrls: ['./edit-student-profile.component.scss']
})
export class EditStudentProfileComponent implements OnInit {

  profileForm!: FormGroup;
  isLoading = false;
  submitted = false;
  skills = new Set<string>([]);

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditStudentProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
    this.profileForm.patchValue(data);
    for (const skill of data?.skills) {
      this.skills.add(skill);
    }
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: [''],
      phone: [''],
      gender: ['', Validators.required],
      dateOfBirth: [null],
      skills: []
    });

  }

  get f(): any { return this.profileForm.controls; }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.skills.add(event.value);
      this.profileForm.controls['skills'].setValue([...this.skills])
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.skills.delete(keyword);
    this.profileForm.controls['skills'].setValue([...this.skills])
  }

  onSubmit(): void {
    this.submitted = true;
    this.profileForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.api.updateProfile(this.profileForm.getRawValue()).subscribe({
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
