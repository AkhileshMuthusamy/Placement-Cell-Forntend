import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGradeComponent } from './upload-grade.component';

describe('UploadGradeComponent', () => {
  let component: UploadGradeComponent;
  let fixture: ComponentFixture<UploadGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
