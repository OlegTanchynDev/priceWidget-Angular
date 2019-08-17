import {Component, Input, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataServiceService} from '../../services/data-service.service';
import {ActivatedRoute} from '@angular/router';
import {styles} from '../../../shared/models/styles';
import {filter} from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-comparison-widget',
  templateUrl: './comparison-widget.component.html',
  styleUrls: ['./comparison-widget.component.css']
})
export class ComparisonWidgetComponent implements OnInit, OnDestroy {
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
  private coins = ['BTC', 'ETH', 'XRP'];
  public percent: any;
  public changer: any;
  public Low24h: any;
  public Hight24h: any;
  public Vol24h: any;
  public TotalVol24h: any;
  public coinsInfo: Array<any> = [];

  constructor(
    private dataService: DataServiceService,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit() {
    this.coinsInfo = [];
    /** Needed for perfect animation work */
    this.now = Date.now();
    /** Set color theme */
    this.style = styles.find(o => o.widgetName === 'comparison-widget');
    this.theme = this.style.theme[this.tagTheme || this.route.snapshot.queryParams.color || 'white'];
    this.renderer.listen(window, 'message', ({data}: any) => {
      if (data.type === 'coin_change') {
        this.coin = data.coin;
        this.getDetails(data.coin);
      }
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
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
    this.dataService.getCoinDetails(coin || 'BTC', undefined, coin ? [coin] : ['BTC'])
      .subscribe(({price}) => {/*
        console.log("AR", arguments);*/
        this.setAnimation(price);
        this.price = price;
        this.loader = false;
        this.getUpdates(coin);
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
          /*console.log('wD :', this.widgetData);*/
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
        this.setAnimation(price);
        this.price = price;
        this.percent = cap24hrChange;
        this.changes(price, cap24hrChange);
      });
  }

  private changes(price: any, percent: any) {
    const res = (price / 100) * percent;
    this.changer = Math.abs(res);
  }

  private setAnimation(price: number) {
    if (this.price < price && this.price) {
      this.triangleClass = 'fa-caret-up up';
      this.animate = 'animated fadeInUp';
    }
    if (this.price > price && this.price) {
      this.triangleClass = 'fa-caret-down down';
      this.animate = 'animated fadeInDown';
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

  private loadImg(scroll?: boolean) {
    this.dataService.getFullCoinsList(!scroll, 1, 'desc')
      .subscribe((data: Array<any>) => {
        for (let index in data[0]) {
          switch (data[0][index].symbol) {
            case 'btc':
              this.coinsInfo[0] = data[0][index];
              break;
            case 'eth':
              this.coinsInfo[1] = data[0][index];
              break;
            case 'xrp':
              this.coinsInfo[2] = data[0][index];
              break;
            default:
              break;
          }
        }
      });
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
