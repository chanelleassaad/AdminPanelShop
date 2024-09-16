import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsManagementComponent } from './details-management.component';

describe('DashboardComponent', () => {
  let component: DetailsManagementComponent;
  let fixture: ComponentFixture<DetailsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
