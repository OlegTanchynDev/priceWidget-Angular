import { Component, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, ignoreElements } from 'rxjs/operators';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.css']
})
export class LineWidgetComponent implements OnInit, OnDestroy {
  @Input() tagTheme: string;
  public triangleClass: string;
  public coin: string = 'BTC';
  public price: number;
  public percent: number;
  public changes: number;
  public loader: boolean = true;
  public animate: string;
  public theme: any;
  public style: any;
  public coinInfo: any;
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;

  private now: any;
  private updServiceSubs: Subscription;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) {}

  ngOnInit() {
    this.now = Date.now();

    this.coin = this.route.snapshot.queryParams.currency || 'BTC';
    /** Set color theme */
    this.style = styles.find(o => o.widgetName === 'simple-bitcoin-price');
    this.theme = this.style.theme[this.tagTheme || this.route.snapshot.queryParams.color ||  'green'];
    this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || 'highlight'];
    this.renderer.listen(window, 'message', ({ data }: any) => {
      if (data.type === 'coin_change') {
        this.coin = data.coin;
        this.getDetails(data.coin);
      }
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
      }
      if (data.type === 'realtime_update') {
        this.getDetails(this.coin);
        this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[data.realtime];
      }
    });

    this.getDetails();
  }

  ngOnDestroy() {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }
  }

  private getDetails(coin?: string) {
    /** First load chart data */
    this.dataService.getCoinDetails(coin || 'BTC', undefined, coin ? [coin] : ['BTC'])
      .subscribe(({ price, percent }) => {
        this.setAnimation(percent);
        this.price = price;
        this.changes = (price / 100) * percent;
        this.percent = percent;
        this.loader = false;
        this.getUpdates(coin);
        this.load();
      });
  }

  private getUpdates(coin?: string) {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

    /** Real-time data changes */
    this.updServiceSubs = this.dataService.getUpdates(coin || 'BTC')
      .pipe(filter(data => !!data))
      .pipe(filter(({ msg: { price } }) => price !== this.price))
      .pipe(filter(() => {
        if (Date.now() - this.now >= 1) {
          this.now = Date.now();
          return true;
        }
      }))
      .subscribe(({ msg: { price, cap24hrChange } }) => {
        this.setAnimation(cap24hrChange);
        this.price = price;
        this.changes = (price / 100) * cap24hrChange;
        this.percent = cap24hrChange;
      });
  }

  public clearAnimationClass() {
    this.animate = null;
  }

  private load(scroll?: boolean) {
    this.dataService.getFullCoinsList(!scroll, 1, 'desc')
      .subscribe((data: Array<any>) => {
        data[0].find((element): any => {
          if (element.symbol === this.coin.toLocaleLowerCase()) {
            this.coinInfo = element;
          }
        });
      });
  }

  private setAnimation(percent: number) {
    if (percent > 0) {
      this.triangleClass = 'fa-caret-up up';
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-up up color-up';
        this.highlightClass = 'color-up';
      } else {
        this.triangleClass = 'fa-caret-up';
        this.highlightClass = '';
      }
    }
    if (percent < 0) {
      this.triangleClass = 'fa-caret-down down';
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-down color-down';
        this.highlightClass = 'color-down';
      } else {
        this.triangleClass = 'fa-caret-down';
        this.highlightClass = '';
      }
    }
  }
}
