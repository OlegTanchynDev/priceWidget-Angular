import {Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, ignoreElements } from 'rxjs/operators';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';


@Component({
  selector: 'simple-bitcoin-price',
  templateUrl: './simple-bitcoin-price.component.html',
  styleUrls: ['./simple-bitcoin-price.component.css']
})
export class SimpleBitcoinPriceComponent implements OnInit, OnDestroy {

  @Input() tagTheme: string;
  public loader = true;
  public theme: any;
  public style: any;
  public coin = 'BTC';
  public price: any;
  public triangleClass: string;
  public animate: string; 
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;

  private now: number;
  private updServiceSubs: Subscription;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) { }

  public ngOnInit() {
    /** Needed for perfect animation work */
    this.now = Date.now();
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
      .subscribe(({ msg: { price, cap24hrChange} }) => {
        this.setAnimation(cap24hrChange);
        this.price = price;
      });
  }

  private setAnimation(percent) {
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
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-down down color-down';
        this.highlightClass = 'color-down'
      } else {
        this.triangleClass = 'fa-caret-down down';
        this.highlightClass = ''
      }
      this.animate = 'animated fadeInDown';
    }
  }

}
