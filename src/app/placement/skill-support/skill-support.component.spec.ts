import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSupportComponent } from './skill-support.component';

describe('SkillSupportComponent', () => {
  let component: SkillSupportComponent;
  let fixture: ComponentFixture<SkillSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
