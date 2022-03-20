import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacultyProfileComponent } from './edit-faculty-profile.component';

describe('EditFacultyProfileComponent', () => {
  let component: EditFacultyProfileComponent;
  let fixture: ComponentFixture<EditFacultyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacultyProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFacultyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
