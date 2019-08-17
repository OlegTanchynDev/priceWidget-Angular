import {Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';
import { st } from '@angular/core/src/render3';


@Component({
  selector: 'app-single-ticker',
  templateUrl: './single-ticker.component.html',
  styleUrls: ['./single-ticker.component.css']
})
export class SingleTickerComponent implements OnInit, OnDestroy {

  @Input() tagTheme: string;
  @Input() tagCoin: string;
  public loader = true;
  public theme: any;
  public style: any;
  public coin: string;
  public price: any;
  public percent: any;
  public change: any;
  public triangleClass: string;
  public animate: string;
  private now: number;
  private updServiceSubs: Subscription;
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) { }

  public ngOnInit() {

    /** Needed for perfect animation work */
    this.now = Date.now();

    this.coin = this.tagCoin || 'BTC';

    /** Set color theme */
    this.style = styles.find(o => o.widgetName === 'single-ticker');
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

    this.getDetails(this.coin);
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
      .subscribe(({ price, percent }) => {
        this.setAnimation(percent);
        this.price = price;
        this.changes(price, percent);
        this.loader = false;
        this.getUpdates(coin);
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
        this.percent = cap24hrChange;
        this.changes(price, cap24hrChange);
      });
  }

  private changes(price: any, percent: any) {
    const res = (price / 100) * percent;
    this.change = Math.abs(res);
  }

  private setAnimation(percent: number) {
    if (percent > 0) {
      this.animate = 'animated fadeInUp';
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-up up color-up';
        this.highlightClass = 'color-up';
      } else {
        this.triangleClass = 'fa-caret-up up';
        this.highlightClass = '';
      }
    }
    if (percent < 0) {
      this.triangleClass = 'fa-caret-down down';
      this.animate = 'animated fadeInDown';
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-down down color-down';
        this.highlightClass = 'color-down';
      } else {
        this.triangleClass = 'fa-caret-down down';
        this.highlightClass = '';
      }
    }
  }

}
