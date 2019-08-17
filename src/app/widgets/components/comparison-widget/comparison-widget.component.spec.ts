import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonWidgetComponent } from './comparison-widget.component';

describe('CompariosonWidgetComponent', () => {
  let component: ComparisonWidgetComponent;
  let fixture: ComponentFixture<ComparisonWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
