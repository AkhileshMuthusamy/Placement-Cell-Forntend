import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from 'src/app/shared/objects/global-objects';

@Component({
  selector: 'app-skill-support',
  templateUrl: './skill-support.component.html',
  styleUrls: ['./skill-support.component.scss']
})
export class SkillSupportComponent implements OnInit {

  isLoading = false;
  displayedColumns: string[] = ['select', 'id', 'firstName', 'lastName', 'email', 'gender', 'phone', 'skills'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
  isListLoading = false;
  totalLength = 0
  
  constructor() { }

  ngOnInit(): void {
  }

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

}
