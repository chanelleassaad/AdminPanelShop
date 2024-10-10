import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCredentialsComponent } from './customer-credentials.component';

describe('CustomerCredentialsComponent', () => {
  let component: CustomerCredentialsComponent;
  let fixture: ComponentFixture<CustomerCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCredentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
