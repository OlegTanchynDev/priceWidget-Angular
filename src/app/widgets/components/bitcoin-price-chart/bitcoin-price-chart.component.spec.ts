import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinPriceChartComponent } from './bitcoin-price-chart.component';

describe('ChartComponent', () => {
  let component: BitcoinPriceChartComponent;
  let fixture: ComponentFixture<BitcoinPriceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinPriceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
