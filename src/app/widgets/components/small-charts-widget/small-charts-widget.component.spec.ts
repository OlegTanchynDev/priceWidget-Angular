import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallChartsWidgetComponent } from './small-charts-widget.component';

describe('SmallChartsWidgetComponent', () => {
  let component: SmallChartsWidgetComponent;
  let fixture: ComponentFixture<SmallChartsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallChartsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallChartsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
