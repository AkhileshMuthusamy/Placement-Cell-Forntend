import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlacementProfileComponent } from './edit-placement-profile.component';

describe('EditPlacementProfileComponent', () => {
  let component: EditPlacementProfileComponent;
  let fixture: ComponentFixture<EditPlacementProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlacementProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlacementProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
