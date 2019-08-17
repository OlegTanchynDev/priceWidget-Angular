import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallChartComponent } from './small-chart.component';

describe('SmallChartComponent', () => {
  let component: SmallChartComponent;
  let fixture: ComponentFixture<SmallChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
