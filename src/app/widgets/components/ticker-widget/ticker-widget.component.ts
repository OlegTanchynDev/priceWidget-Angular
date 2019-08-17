import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DataServiceService } from 'src/app/widgets/services/data-service.service';
import { styles } from 'src/app/shared/models/styles';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticker-widget',
  templateUrl: './ticker-widget.component.html',
  styleUrls: ['./ticker-widget.component.css']
})
export class TickerWidgetComponent implements OnInit, OnDestroy {

  public loader = true;
  public theme: any;
  public widgetData = [];
  public isRealtimeHighlightUpdate: any;
  private coins = ['BTC', 'LTC', 'ETH', 'XRP'];

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) { }

  ngOnInit() {

    const style = styles.find((o) => o.widgetName === 'ticker-widget' );
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

  public clearAnimationClass(coin) {
    Object.assign(this.widgetData.find(o => o.FROMSYMBOL === coin), {animate: ''});
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
          const data = RAW[key]['USD'];
          this.change(data, data.OPENDAY);
          this.calculate(data, data.OPENDAY);
          this.widgetData.push(data);
          Object.assign(this.widgetData, { coin: key });
        });
        this.loader = false;
        /** subscribe to updates after creating array with coins data */
        this.getUpdates();
      });
  }

  private getUpdates() {

    this.coins.forEach(key => {

      const coin = this.widgetData.find(o => o.FROMSYMBOL === key);

      this[key] = this.dataService.getUpdates(key)
        .pipe(filter(data => !!data))
        .pipe(filter(({msg: {price}}) => price.toFixed(2) !== coin.PRICE))
        .pipe(filter(() => {
          const time = key + 'Now';
          if (Date.now() - this[time] < 1) {
            return false;
          } else {
            this[time] = Date.now();
            return true;
          }
        }))
        .subscribe(({msg: { price }}) => {
          this.change(coin, price);
          this.calculate(coin, price);
        });
    });
  }

  private unsubscribeCoinsUpdates() {
    this.coins.forEach(key => this[key].unsubscribe());
  }

  private calculate(coin, price) {
    const percent = 100 / coin.PRICE * price - 100;
    if (Math.abs(percent) > 0) {
      coin.percent = Math.ceil(Math.abs(percent) * 100) / 100;
      coin.priceDiff = Math.ceil(Math.abs(coin.PRICE - price) * 100) / 100;
      coin.PRICE = price;
    }
  }

  public change(coin, price) {

    if (price > coin.PRICE) {
      if (this.isRealtimeHighlightUpdate) {
        Object.assign(coin, {triangleClass: 'fa-caret-up up color-up', highlightClass: "color-up", toClass: 'animated fadeInUp up' });
      } else {
        Object.assign(coin, {triangleClass: 'fa-caret-up up', highlightClass: "", toClass: 'animated fadeInUp up' });
      }
    }
    if (price < coin.PRICE) {
      if (this.isRealtimeHighlightUpdate) {
        Object.assign(coin, {triangleClass: 'fa-caret-down down color-down', highlightClass: "color-down", toClass: 'animated fadeInDown down' });
      } else {
        Object.assign(coin, {triangleClass: 'fa-caret-down down', highlightClass: "", toClass: 'animated fadeInDown down' });
      }
    }
  }

}
