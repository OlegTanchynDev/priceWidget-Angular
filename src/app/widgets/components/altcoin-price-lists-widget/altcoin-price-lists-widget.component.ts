import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';

import { styles } from '../../../shared/models/styles';
import { historyBitcoinPriceWidget } from '../../../shared/models/hystory';
import { DataServiceService } from '../../services/data-service.service';


@Component({
  selector: 'app-altcoin-price-lists-widget',
  templateUrl: './altcoin-price-lists-widget.component.html',
  styleUrls: ['./altcoin-price-lists-widget.component.css']
})
export class AltcoinPriceListsWidgetComponent implements OnInit, OnDestroy {

  public theme: any;
  public loader = true;
  public style: any;
  public widgetData = [];
  public activePeriod: any = historyBitcoinPriceWidget[0];
  public history: any;
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;

  private coins = ['ETH', 'LTC', 'XRP'];

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.style = styles.find(o => o.widgetName === 'altcoin-price-lists-widget');
    this.theme = this.style.theme[this.route.snapshot.queryParams.color || 'white'];
    this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || 'highlight'];
    this.renderer.listen(window, 'message', ({data}: any) => {
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
      }
      if (data.type === 'realtime_update') {
        this.getDetails();
        this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[data.realtime];
      }
    });

    this.history = this.forEachPeriod(historyBitcoinPriceWidget, this.style.hiddenPeriod);
    this.getDetails();
  }

  public ngOnDestroy(): void {
    this.unsubscribeCoinsUpdates();
  }

  public clearAnimationClass(coin) {
    Object.assign(this.widgetData.find(o => o.coin === coin), {animate: ''});
  }

  public changePeriod(param: any) {
    const timestamp = moment().subtract(param.amount, param.period).unix();
    this.getDetails(timestamp);
    this.activePeriod = param;
  }

  /*
* @todo fix get name from coin symbol by API
 */

  private getDetails(timestamp: any = moment().subtract(24, 'hour').unix()) {
    /** Get first load chart data */
    this.dataService.getAltcoinsPrices(timestamp, this.coins)
      .subscribe(({ previous, current, names }) => {
        this.widgetData = [];
        this.coins.forEach((coin) => {
          this.widgetData.push({
            coin: coin,
            price: current[coin].USD.PRICE,
            btc: current[coin].BTC.PRICE,
            percent: this.calcPercent(current[coin].USD.PRICE, previous[coin].USD),
            oldPrice: previous[coin].USD,
            name: names.find(o => o.CoinInfo.Name === coin).CoinInfo.FullName
          });
          this.setAnimation(current[coin].USD.PRICE, coin);

        });

        this.loader = false;
        this.getUpdates();
      });
  }

  private getUpdates() {
    this.coins.forEach(coin => {
      /** Get real-time data changes */
      this[coin] = this.dataService.getUpdates(coin)
        .pipe(filter(data => !!data))
        .pipe(filter(({msg: {price}}) => {
          return price.toFixed(2) !== this.widgetData.find( o => o.coin === coin).price;
        } ))
        .pipe(filter(() => {
          const time = coin + 'Now';
          if (Date.now() - this[time] < 1) {
            return false;
          } else {
            this[time] = Date.now();
            return true;
          }
        }))
        .subscribe(({msg: {price, long, short}}) => {
          const assignedCoin = this.widgetData.find(o => o.coin === short) || {};
          const params = {percent: this.calcPercent(price, assignedCoin.oldPrice), price};
          Object.assign(assignedCoin, params);
          this.setAnimation(price, coin);
        });
    });
  }

  /** Calculate current percent difference from middle price of current price  */
  private calcPercent(current, old = 1) {
    return 100 / old * current - 100;
  }

  private setAnimation(newPrice: number, coinName: string) {

    const coin = this.widgetData.find(o => o.coin === coinName);

    if (coin.oldPrice < newPrice) {
      if (this.isRealtimeHighlightUpdate) {
        Object.assign(coin, {
          triangleClass: 'fa-caret-up up color-up',
          highlightClass: 'color-up up',
          animate: 'animated fadeInUp'
        });
      } else {
        Object.assign(coin, {
          triangleClass: 'fa-caret-up up',
          highlightClass: '',
          animate: 'animated fadeInUp'
        });
      }
    }
    if (coin.oldPrice > newPrice) {
      if (this.isRealtimeHighlightUpdate) {
        Object.assign(coin, {
          triangleClass: 'fa-caret-down down color-down',
          highlightClass: 'color-down',
          animate: 'animated fadeInDown'
        });
      } else {
        Object.assign(coin, {
          triangleClass: 'fa-caret-down down',
          highlightClass: '',
          animate: 'animated fadeInDown'
        });
      }
    }
  }

  private unsubscribeCoinsUpdates() {
    this.coins.forEach(coin => {
      if (this[coin]) {
        this[coin].unsubscribe()
      }
    });
  }

  private forEachPeriod(periodArr: any, haystack?: any) {
    return haystack ? periodArr.filter(period => !haystack.includes(period.name)) : periodArr;
  }

}
