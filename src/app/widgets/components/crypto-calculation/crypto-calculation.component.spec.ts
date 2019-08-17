import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCalculationComponent } from './crypto-calculation.component';

describe('CryptoCalculationComponent', () => {
  let component: CryptoCalculationComponent;
  let fixture: ComponentFixture<CryptoCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
