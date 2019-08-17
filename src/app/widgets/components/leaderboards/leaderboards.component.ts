import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { styles } from '../../../shared/models/styles';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {

  @Input() tagTheme: string;
  public loader = true;
  public theme: any;
  public style: any;
  public coin = 'BTC';
  public price: any;
  public triangleClass: string;
  public animate: string;
  private now: number;
  private updServiceSubs: Subscription;
  public widgetData = [];
  private coins = ['BTC'];
  public percent: any;
  public changer: any;
  public Low24h: any;
  public Hight24h: any;
  public Vol24h: any;
  public TotalVol24h: any;
  public coinInfo: any;
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;
  public currentStyle: any;

  constructor(
    private dataService: DataServiceService,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    /** Needed for perfect animation work */
    this.now = Date.now();
    /** Set color theme */
    this.style = styles.find(o => o.widgetName === 'leaderboards');
    this.theme = this.style.theme[this.tagTheme || this.route.snapshot.queryParams.color || 'white'];
    this.currentStyle = this.style.styles.widgetStyles[this.route.snapshot.queryParams.style || 'classic'].name;
    this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || 'highlight'];
    this.renderer.listen(window, 'message', ({data}: any) => {
      if (data.type === 'coin_change') {
        this.coin = data.coin;
        this.getDetails(data.coin);
        this.loadImg();
      }
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
      }
      if (data.type === 'realtime_update') {
        this.getDetails(this.coin);
        this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[data.realtime];
      }
      if (data.type === 'style_update') {
        this.currentStyle = data.style;
      }
    });

    this.getDetails();
    this.loadImg();
  }

  public ngOnDestroy(): void {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }
  }

  public clearAnimationClass() {
    this.animate = null;
  }

  private getDetails(coin?: string) {
    /** First load chart data */
    this.dataService.getCoinDetails(coin || 'BTC', undefined, coin ? [coin] : ['BTC'], 'USD', ['USD'])
      .subscribe(({price, percent}) => {
        this.setAnimation(percent);
        this.price = price;
        this.loader = false;
        this.percent = percent;
        this.changes(price, percent);
        this.getUpdates();
      });
    /*coin*/
    this.dataService.getFirstCoinDetails(
      this.coins,
      ['USD']
    )
      .subscribe(({RAW}) => {
        this.coins.forEach(key => {
          const data = RAW[key]['USD'];
          this.change(data, data.OPENDAY);
          this.calculate(data, data.OPENDAY);
          this.widgetData.push(data);
          Object.assign(this.widgetData, {coin: key});
        });
        this.loader = false;
        /** subscribe to updates after creating array with coins data */
        this.getUpdates();
      });
  }

  private getUpdates(coin?: string) {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

    /** Real-time data changes */
    this.updServiceSubs = this.dataService.getUpdates(coin || 'BTC')
      .pipe(filter(data => !!data))
      .pipe(filter(({msg: {price}}) => price !== this.price))
      .pipe(filter(() => {
        if (Date.now() - this.now >= 1) {
          this.now = Date.now();
          return true;
        }
      }))
      .subscribe(({msg: {price, cap24hrChange}}) => {
        this.setAnimation(cap24hrChange);
        this.price = price;
        this.percent = cap24hrChange;
        this.changes(price, cap24hrChange);
        this.loadImg();
      });
  }

  /* load img for coin */
  private loadImg(scroll?: boolean) {
    this.dataService.getFullCoinsList(!scroll, 1, 'desc')
      .subscribe((data: Array<any>) => {
        data[0].find((element): any => {
          if (element.symbol === this.coin.toLocaleLowerCase()) {
            this.coinInfo = element;
          }
        });
      });
  }

  private changes(price: any, percent: any) {
    const res = (price / 100) * percent;
    this.changer = Math.abs(res);
  }

  private setAnimation(percent: number) {
    if (percent > 0) {
      this.animate = 'animated fadeInUp';
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-up up color-up';
        this.highlightClass = 'color-up';
      } else {
        this.triangleClass = 'fa-caret-up';
        this.highlightClass = '';
      }
    }
    if (percent < 0) {
      this.animate = 'animated fadeInDown';
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-down color-down';
        this.highlightClass = 'color-down';
      } else {
        this.triangleClass = 'fa-caret-down';
        this.highlightClass = '';
      }
    }
  }

  private calculate(coin, price) {
    const percent = 100 / coin.PRICE * price - 100;
    if (Math.abs(percent) > 0) {
      coin.percent = Math.ceil(Math.abs(percent) * 100) / 100;
      coin.priceDiff = Math.ceil(Math.abs(coin.PRICE - price) * 100) / 100;
      coin.PRICE = price;
      this.Low24h = coin.LOW24HOUR;
      this.Hight24h = coin.HIGH24HOUR;
      this.Vol24h = coin.VOLUME24HOURTO;
      this.TotalVol24h = coin.TOTALVOLUME24HTO;
    }
  }

  public change(coin, price) {

    if (price > coin.PRICE) {
      Object.assign(coin, {triangleClass: 'fa-caret-up up', toClass: 'animated fadeInUp up'});
    }
    if (price < coin.PRICE) {
      Object.assign(coin, {triangleClass: 'fa-caret-down down', toClass: 'animated fadeInDown down'});
    }
  }

}
