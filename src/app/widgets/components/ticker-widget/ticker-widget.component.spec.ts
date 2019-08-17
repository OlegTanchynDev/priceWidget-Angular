import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerWidgetComponent } from './ticker-widget.component';

describe('TickerWidgetComponent', () => {
  let component: TickerWidgetComponent;
  let fixture: ComponentFixture<TickerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
