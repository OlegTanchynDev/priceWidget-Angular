import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinPriceWidgetComponent } from './bitcoin-price-widget.component';

describe('BitcoinPriceWidgetComponent', () => {
  let component: BitcoinPriceWidgetComponent;
  let fixture: ComponentFixture<BitcoinPriceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinPriceWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinPriceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
