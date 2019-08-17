import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingIndexComponent } from './pricing-index.component';

describe('PricingIndexComponent', () => {
  let component: PricingIndexComponent;
  let fixture: ComponentFixture<PricingIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
