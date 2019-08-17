import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-pricing-index',
  templateUrl: './pricing-index.component.html',
  styleUrls: ['./pricing-index.component.css']
})
export class PricingIndexComponent implements OnInit, OnDestroy {
  @ViewChild('styleContainer') styleContainer: any;

  public loader = true;
  public theme: any;
  public style: any;
  public coin = 'BTC';
  public price: number;
  public labelClass: any;
  public triangleClass;
  public widgetData: any;
  public animate: string;
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;

  private chartRenderData: any;
  private now: number;
  private updServiceSubs: Subscription;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) {}

  ngOnInit() {

    /** Needed for the perfect animation */
    this.now = Date.now();

    /** Customize widget */
    this.style = styles.find(o => o.widgetName === 'pricing-index');
    this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || 'highlight'];
    this.theme = this.style.theme[this.route.snapshot.queryParams.color || 'white'];
    this.renderer.listen(window, 'message', ({ data }: any) => {
      if (data.type === 'coin_change') {
        this.coin = data.coin;
        this.getDetails(data.coin);
      }
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
        this.initChart(this.containArray(this.widgetData.historyPrice));
      }
      if (data.type === 'realtime_update') {
        this.getDetails(this.coin);
        this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[data.realtime];
      }
    });

    this.getDetails();
  }

  ngOnDestroy(): void {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }
  }

  public clearAnimationClass() {
    this.animate = null;
  }

  /** Get first load chart data */
  private getDetails(coin?: string) {
    this.dataService.getCoinDetails(
      coin || 'BTC',
      undefined,
      coin ? [coin] : ['BTC'])
        .subscribe(({ historyPrice, minPrice, maxPrice, price, percent, supply, blocks, converter }) => {
          this.widgetData = { minPrice, maxPrice, price, blocks, converter, historyPrice };
          this.setAnimation(price);
          this.price = price;
          this.initChart(this.containArray(historyPrice));
          this.loader = false;
          this.getUpdates(coin);
        });
  }

  /** Get real-time data changes */
  private getUpdates(coin?: string) {

    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

    /** Get real-time data changes */
    this.updServiceSubs = this.dataService.getUpdates(coin)
      .pipe(filter(data => !!data))
      .pipe(filter(({ msg: { price } }) => price !== this.widgetData.price))
      .pipe(filter(() => {
        if (Date.now() - this.now >= 1) {
          this.now = Date.now();
          return true;
        }
      }))
      .subscribe(({ msg }) => {
        const { cap24hrChange, supply, price, mktcap } = msg;
        const minPrice = (this.widgetData.minPrice > price && parseInt(price, 10) > 0) ? price : this.widgetData.minPrice;
        const maxPrice = (this.widgetData.maxPrice < price) ? price : this.widgetData.maxPrice;
        Object.assign(this.widgetData, { price, supply, percent: cap24hrChange, marketCap: mktcap, minPrice, maxPrice });
        this.change(this.widgetData);
        this.setAnimation(price);
        this.widgetData.price = price;
      });
  }

  private change(data): any {
    const res = (data.price / 100) * data.percent;
    this.widgetData.change = Math.abs(res);
  }

  private containArray(values): Array<any> {
    return values.map((key) => [new Date(key.time * 1000), Number(key.close)]);
  }

  private setAnimation(price: number) {
    if (this.price < price && this.price) {
      this.labelClass = 'plus';
      this.animate = 'animated fadeInUp';
      if (this.isRealtimeHighlightUpdate) {
        this.triangleClass = 'fa-caret-up up color-up';
        this.highlightClass = 'color-up';
      } else {
        this.triangleClass = 'fa-caret-up';
        this.highlightClass = '';
      }
    }
    if (this.price > price && this.price) {
      this.labelClass = 'minus';
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

  private initChart(values: Array<any>): void {
    /** set poin color from chart */
    this.styleContainer.nativeElement.innerHTML = '<style>' +
      '#pricing-index circle + g > circle:last-of-type {stroke: ' +
      this.theme.point +
      '!important;}' +
      '</style>';

    /** chart setting + data + chart type */
    this.chartRenderData = {
      chartType: 'AreaChart',
      dataTable: [['time', 'price'], ...values],
      options: {
        backgroundColor: 'none',
        dataOpacity: 1,
        pointsVisible: false,
        explorer: {
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 2.0
        },
        legend: {
          position: 'none'
        },
        trigger: 'none',
        tooltip: 'none',
        hAxis: {
          gridlines: { color: 'none' },
          textPosition: 'none',
        },
        vAxis: {
          viewWindowMode: 'explicit',
          baselineColor: 'none',
          textPosition: 'none',
          gridlines: { color: 'none' },
        },
        series: [{
          color: this.theme.series,
          areaOpacity: '0',
        }],
        chartArea: {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }
      },
    };
  }

}
