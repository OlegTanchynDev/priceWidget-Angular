import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltcoinPriceWidgetComponent } from './altcoin-price-widget.component';

describe('AltcoinPriceWidgetComponent', () => {
  let component: AltcoinPriceWidgetComponent;
  let fixture: ComponentFixture<AltcoinPriceWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltcoinPriceWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltcoinPriceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
