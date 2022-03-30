import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {APIResponse} from 'src/app/shared/objects/api-response';
import {User} from 'src/app/shared/objects/global-objects';
import {ApiService} from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-skill-support',
  templateUrl: './skill-support.component.html',
  styleUrls: ['./skill-support.component.scss']
})
export class SkillSupportComponent implements OnInit, AfterViewInit {

  isLoading = false;
  displayedColumns: string[] = ['select', 'id', 'firstName', 'lastName', 'email', 'gender', 'phone', 'skills'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
  isListLoading = false;
  totalLength = 0

  filterForm!: FormGroup;
  submitted = false;

  skills: Array<string> = [];
  departments: Array<string> = [];
  batches: Array<string> = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialog: MatDialog,
  ) {
    this.createForm();
    this.loadSkillList();
    this.loadDepartmentList();
    this.loadBatchList();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm(): void {
    this.filterForm = this.fb.group({
      skills: [undefined, Validators.required],
      match: ['ANY'],
      cgpa: [],
      batch: [[]],
      department: [[]]
    });

  }

  get f(): any { return this.filterForm.controls; }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

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

  filterStudent(): void {
    this.submitted = true;
    this.filterForm.markAllAsTouched();  // Mark all the field as touched to show errors.
    if (this.filterForm.valid) {
      this.isListLoading = true;

      this.api.findStudentWithSkill(this.filterForm.getRawValue()).subscribe({
        next: (res: APIResponse<Array<User>>) => {
          if (!res.error) {
            this.dataSource.data = res.data;
            this.totalLength = res.data.length;
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
  }

}
