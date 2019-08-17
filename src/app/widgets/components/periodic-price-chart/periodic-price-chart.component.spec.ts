import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicPriceChartComponent } from './periodic-price-chart.component';

describe('PeriodicPriceComponent', () => {
  let component: PeriodicPriceChartComponent;
  let fixture: ComponentFixture<PeriodicPriceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicPriceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
