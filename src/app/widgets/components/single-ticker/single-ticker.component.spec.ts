import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTickerComponent } from './single-ticker.component';

describe('SingleTickerComponent', () => {
  let component: SingleTickerComponent;
  let fixture: ComponentFixture<SingleTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
