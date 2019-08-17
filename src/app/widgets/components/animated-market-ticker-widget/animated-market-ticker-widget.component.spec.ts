import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedMarketTickerWidgetComponent } from './animated-market-ticker-widget.component';

describe('AnimatedMarketTickerWidgetComponent', () => {
  let component: AnimatedMarketTickerWidgetComponent;
  let fixture: ComponentFixture<AnimatedMarketTickerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedMarketTickerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedMarketTickerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
