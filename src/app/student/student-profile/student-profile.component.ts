import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';
import {AuthService} from 'src/app/shared/services/auth.service';
import {DataService} from 'src/app/shared/services/data.service';
import {EditStudentProfileComponent} from '../edit-student-profile/edit-student-profile.component';
import countries from '../../../assets/countries.json';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  isLoading = false;
  profile!: User;

  $subscription!: Subscription;

  selectedFile!: File | undefined;
  validFileTypes: { [key: string]: string } = {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  };
  
  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.$subscription = this.dataService.getProfile().subscribe((profile: User | null) => {
      if (profile) {
        this.profile = profile;
        console.log(this.profile)
      }
    });
  }

  get countries(): {[key:string]: string} {
    return countries;
  }

  getCountry(countryCode: string) {
    return this.countries[countryCode]
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditStudentProfileComponent, {
      width: '550px',
      data: this.profile
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'SUCCESS') {
        this.dataService.loadProfile()
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
      
    } else {
      this.resetState();
      this.snackBar.open('Invalid file type', 'Close', { duration: 2000 });
    }
  }


  uploadResume(): void {
    if (this.selectedFile) {
      this.isLoading = true;

      // this.selectedFile = new File([this.selectedFile], `${this.authService.getUserProfile().id}.${this.validFileTypes[this.selectedFile?.type]}`);
      const formData = new FormData();
      formData.append('file', this.selectedFile);
    
      this.api.uploadResume(formData).subscribe({
        next: (res: APIResponse<any>) => {
          this.dataService.loadProfile();
          this.isLoading = false;
        },
        complete: () => {},
        error: (err: {error: {message: any}}) => {
          this.isLoading = false;
        }
      });
    }
    this.resetState();
  }

  resetState(): void {
    this.isLoading = false;
    this.selectedFile = undefined;
  }

}
