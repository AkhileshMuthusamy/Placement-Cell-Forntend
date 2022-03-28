import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';
import {DataService} from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-edit-faculty-profile',
  templateUrl: './edit-faculty-profile.component.html',
  styleUrls: ['./edit-faculty-profile.component.scss']
})
export class EditFacultyProfileComponent implements OnInit {

  profileForm!: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditFacultyProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
    this.createForm();
    this.profileForm.patchValue(data);
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
      skills: [],
      address: ['']
    });

  }

  get f(): any { return this.profileForm.controls; }

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
