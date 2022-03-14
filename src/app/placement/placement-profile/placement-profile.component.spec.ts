import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementProfileComponent } from './placement-profile.component';

describe('PlacementProfileComponent', () => {
  let component: PlacementProfileComponent;
  let fixture: ComponentFixture<PlacementProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
