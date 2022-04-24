import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {

  isLoading = false;

  newSkill = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<AddSkillComponent>,
  ) {
    // Disabled dialog close when clicked outside
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.newSkill.markAllAsTouched();

    if (this.newSkill.valid) {
      this.isLoading = true;
      this.api.addSkill(this.newSkill.value).subscribe({
        next: (res: APIResponse<any>) => {
          if (!res.error) {
            this.dialogRef.close('SUCCESS');
          }
          this.isLoading = false;
        },
        complete: () => {},
        error: (err: {error: {message: any}}) => {
          this.isLoading = false;
        }
      })
    }

  }
}
