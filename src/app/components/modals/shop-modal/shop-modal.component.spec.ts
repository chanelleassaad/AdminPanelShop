import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopModalComponent } from './shop-modal.component';

describe('ShopModalComponent', () => {
  let component: ShopModalComponent;
  let fixture: ComponentFixture<ShopModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
