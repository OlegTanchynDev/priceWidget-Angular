import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyMarketComponent } from './cryptocurrency-market.component';

describe('CryptocurrencyMarketComponent', () => {
  let component: CryptocurrencyMarketComponent;
  let fixture: ComponentFixture<CryptocurrencyMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocurrencyMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
