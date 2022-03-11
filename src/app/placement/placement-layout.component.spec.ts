import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementLayoutComponent } from './placement-layout.component';

describe('PlacementLayoutComponent', () => {
  let component: PlacementLayoutComponent;
  let fixture: ComponentFixture<PlacementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
