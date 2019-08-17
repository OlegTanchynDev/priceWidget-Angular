import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-animated-market-ticker-widget',
  templateUrl: './animated-market-ticker-widget.component.html',
  styleUrls: ['./animated-market-ticker-widget.component.css']
})
export class AnimatedMarketTickerWidgetComponent implements OnInit, OnDestroy {

  public loader = true;
  public theme: any;
  public widgetData = [];
  public triangleClass: string;
  private now = Date.now();
  private coins = ['BTC', 'LTC', 'ETH', 'XRP'];
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;


  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) { }

  ngOnInit() {

    const style = styles.find((o) => o.widgetName === 'animated-market-ticker-widget' );
    this.theme = style.theme[this.route.snapshot.queryParams.color || 'white'];
    this.isRealtimeHighlightUpdate = style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || 'highlight'];
    this.renderer.listen(window, 'message', ({data}: any) => {
      if (data.type === 'color_change') {
        this.theme = style.theme[data.color];
      }

      if (data.type === 'realtime_update') {
        this.getDetails();
        this.isRealtimeHighlightUpdate = style.highlightRealtimeUpdate[data.realtime];
      }
    });

    this.getDetails();

  }

  ngOnDestroy() {
    this.unsubscribeCoinsUpdates();
  }

  private getDetails() {
    this.widgetData = [];
    this.dataService.getFirstCoinDetails(
      this.coins,
      ['USD']
    )
      .subscribe(({ RAW }) => {
        this.coins.forEach(key => {
          this.widgetData.push(RAW[key]['USD']);
          const open = RAW[key]['USD'].OPENDAY;
          this.change(open, key);
        });

        /** subscribe to updates after creating array with coins data */
        this.getUpdates();
        this.loader = false;
      });
  }

  private getUpdates() {

    this.coins.forEach(key => {
      const coin = this.widgetData.find(o => o.FROMSYMBOL === key);

      this[key] = this.dataService.getUpdates(key)
        .pipe(filter(data => !!data))
        .pipe(filter(({msg: {price}}) => price.toFixed(2) !== coin.PRICE))
        .pipe(filter(() => {
          if (Date.now() - this.now >= 1) {
            this.now = Date.now();
            return true;
          }
        }))
        .subscribe(({msg: { price }}) => {
            this.change(price, key);
            const minPrice = (coin.LOWDAY < price) ? coin.LOWDAY : price;
            const maxPrice = (coin.HIGHDAY > price) ? coin.HIGHDAY : price;
            Object.assign(coin, { price, LOWDAY: minPrice, HIGHDAY: maxPrice });
        });
    });
  }

  private unsubscribeCoinsUpdates() {
    this.coins.forEach(key => {
      if (this[key]) {
        this[key].unsubscribe()
      }
    });
  }

  private change(current: number, coinName: string) {
    const coin = this.widgetData.find(o => o.FROMSYMBOL === coinName);

    if (current > coin.PRICE) {
      if (this.isRealtimeHighlightUpdate) {
        coin.triangleClass = 'fa-caret-up up color-up';
        this.highlightClass = 'color-up';
      } else {
        coin.triangleClass = 'fa-caret-up';
        this.highlightClass = '';
      }
    }
    if (current < coin.PRICE) {
      if (this.isRealtimeHighlightUpdate) {
        coin.triangleClass = 'fa-caret-down down color-down';
        this.highlightClass = 'color-down';
      } else {
        coin.triangleClass = 'fa-caret-down down';
        this.highlightClass = '';
      }
    }
    
}

}
