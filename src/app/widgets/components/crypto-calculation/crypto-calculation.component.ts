import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { styles } from '../../../shared/models/styles';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crypto-calculation',
  templateUrl: './crypto-calculation.component.html',
  styleUrls: ['./crypto-calculation.component.css']
})
export class CryptoCalculationComponent implements OnInit {
  @Input() tagTheme: string;
  public coinsData: any;
  public currenciesData: any;
  public valueFrom: any;
  public valueTo: any;
  public tempCurrency: string;
  public ratioToCoin: number;
  public ratioToCurrency: string;
  public coin: string;
  public coinList: Array<any> = [];
  public currencyList: Array<any> = [];
  public loader: boolean;
  public theme: any;
  public style: any;
  public reorder = false;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) { }

  private load(scroll?: boolean) {
    this.dataService.getFullCoinsList(!scroll, 1, 'desc')
      .subscribe((data) => {
        if (!scroll) {
          this.coinsData = data[0];
          for(let i = 0; i < this.coinsData.length; i++) {
            this.coinList.push(this.coinsData[i].symbol);
            if (this.coinsData[i].symbol === this.coin) {
              this.coin = this.coinsData[i].symbol;
            }
          }

          //set currency
          for (let key in this.coinsData[0].market_data.current_price) {
            if (!this.coinList.find((element) => {
                if (element === key) {
                  return true;
                }
            })) {
              this.currencyList.push(key);
              if (key.toLocaleLowerCase() === this.tempCurrency) {
                this.tempCurrency = key;
              }
            }
          }

        } else {
          this.coinsData = this.coinsData.concat(data);
        }
        this.loader = false;
        this.getRatio();
      })
  }

  private getRatio() {
    for(let i = 0; i < this.coinsData.length; i++) {
      if (this.coinsData[i].symbol.toLocaleLowerCase() === this.coin.toLocaleLowerCase()) {
        this.valueFrom = this.coinsData[i].market_data.current_price[this.tempCurrency.toLocaleLowerCase()];
        this.ratioToCoin = this.coinsData[i].market_data.current_price[this.tempCurrency.toLocaleLowerCase()];
        this.valueTo = this.coinsData[i].market_data.current_price[this.coin.toLocaleLowerCase()];
        break;
      }
    }
  }

  private updateCurrencyData() {
    this.load();
  }

  private onChangeFrom() {
    this.valueTo = this.valueFrom / this.ratioToCoin;
  }

  private onChangeTo() {
    this.valueFrom = this.valueTo * this.ratioToCoin;
  }


  ngOnInit() {
    this.coin = 'btc';
    this.tempCurrency = 'usd';
    this.style = styles.find(o => o.widgetName === 'crypto-calculation');
    this.theme = this.style.theme[this.tagTheme || this.route.snapshot.queryParams.color ||  'white'];
    this.renderer.listen(window, 'message', ({ data }: any) => {
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
      }
    });
    this.load();
  }

  reorderFn() {
    this.reorder = !this.reorder;

    if ( this.reorder ) {
      this.valueFrom = this.valueTo;
      this.onChangeFrom();
    } else {
      this.valueTo = this.valueFrom;
      this.onChangeTo();
    }

  }
}
