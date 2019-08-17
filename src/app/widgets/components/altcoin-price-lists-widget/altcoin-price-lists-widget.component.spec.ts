import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltcoinPriceListsWidgetComponent } from './altcoin-price-lists-widget.component';

describe('AltcoinPriceListsWidgetComponent', () => {
  let component: AltcoinPriceListsWidgetComponent;
  let fixture: ComponentFixture<AltcoinPriceListsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltcoinPriceListsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltcoinPriceListsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
