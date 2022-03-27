import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyActivityComponent } from './faculty-activity.component';

describe('FacultyActivityComponent', () => {
  let component: FacultyActivityComponent;
  let fixture: ComponentFixture<FacultyActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
