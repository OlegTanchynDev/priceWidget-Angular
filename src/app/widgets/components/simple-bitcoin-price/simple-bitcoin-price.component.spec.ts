import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBitcoinPriceComponent } from './simple-bitcoin-price.component';

describe('BlockComponent', () => {
  let component: SimpleBitcoinPriceComponent;
  let fixture: ComponentFixture<SimpleBitcoinPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleBitcoinPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBitcoinPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
