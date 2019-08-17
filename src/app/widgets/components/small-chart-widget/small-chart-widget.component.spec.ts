import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallChartWidgetComponent } from './small-chart-widget.component';

describe('SmallChartWidgetComponent', () => {
  let component: SmallChartWidgetComponent;
  let fixture: ComponentFixture<SmallChartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallChartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
