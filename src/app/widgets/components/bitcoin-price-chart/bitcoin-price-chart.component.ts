import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'bitcoin-price-chart',
  templateUrl: './bitcoin-price-chart.component.html',
  styleUrls: ['./bitcoin-price-chart.component.css']
})
export class BitcoinPriceChartComponent implements OnInit, OnDestroy {
  @ViewChild('styleContainer') styleContainer: any;

  public loader = true;
  public theme: any;
  public style: any;
  public coin = 'BTC';
  public price: number;
  public date: Date;
  public widgetData: any;
  public triangleClass: string;
  public animate: string;
  public chartRenderData: any;
  public isRealtimeUpdate: boolean;
  public currentPrice: number;
  public currentPercent: number;

  private now: number;
  private updServiceSubs: Subscription;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) { }

  /**
   * @todo "Blocks" - wrong value
   */
  public ngOnInit() {

    /** Needed for the perfect animation */
    this.now = Date.now();

    /** Customize widget */
    this.style = styles.find(o => o.widgetName === 'bitcoin-price-chart');
    this.theme = this.style.theme[this.route.snapshot.queryParams.color || 'blue'];
    this.isRealtimeUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || true];
    this.coin = this.route.snapshot.queryParams.currency || 'BTC';
    this.renderer.listen(window, 'message', ({ data }: any) => {
      if (data.type === 'coin_change') {
        this.triangleClass = null;
        this.coin = data.coin;
        this.getDetails(data.coin);
        if (this.isRealtimeUpdate) {
          this.getUpdates(data.coin);
        }
      }
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
        this.initChart(this.containArray(this.widgetData.historyPrice));
      }
      if (data.type === 'realtime_update') {
        this.isRealtimeUpdate = data.realtime;
        if (this.isRealtimeUpdate) {
          this.getDetails(this.coin);
        } else if (this.updServiceSubs) {
          this.updServiceSubs.unsubscribe();
        }
      }
    });

    this.getDetails();
  }

  public ngOnDestroy(): void {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }
  }

  public mouseOver(event) {
    this.triangleClass = null;
    this.price = event.value;
    this.date = event.date;
    this.change(this.widgetData, {price: this.price});
    this.calculatePersentage(this.price);

  }

  public mouseOut() {
    this.price = this.widgetData.price;
    this.change({price: this.currentPrice, percent: this.currentPercent});
    this.widgetData.percent = this.currentPercent;
    this.date = new Date();
  }

  public clearAnimationClass() {
    this.animate = null;
  }

  /** Get first load chart data */
  private getDetails(coin?: string) {
    this.dataService.getCoinDetails(
      coin || 'BTC',
      'histoday',
      coin ? [coin] : ['BTC'],
      'USD',
      ['USD'],
      this.calcLimit())
      .subscribe(({ historyPrice, marketCap, minPrice, maxPrice, price, percent, supply, blocks }) => {
        this.widgetData = { marketCap, minPrice, maxPrice, price, supply, blocks, historyPrice, percent};
        this.price = price;
        this.currentPrice = price;
        this.currentPercent = percent;
        this.date = new Date();
        this.initChart(this.containArray(historyPrice));
        this.change(this.widgetData);
        this.loader = false;
        if (this.isRealtimeUpdate) {
          this.getUpdates(this.coin);
        }
      });
  }

  private getUpdates(coin?: string) {

    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

    /** Get real-time data changes */
    this.updServiceSubs = this.dataService.getUpdates(coin)
      .pipe(filter(data => !!data))
      .pipe(filter(({ msg: { price } }) => price !== this.price))
      .pipe(filter(() => {
        if (Date.now() - this.now >= 1) {
          this.now = Date.now();
          return true;
        }
      }))
      .subscribe(({ msg }) => {
        const { cap24hrChange, supply, price, mktcap } = msg;
        const minPrice = (this.widgetData.minPrice < price) ? this.widgetData.minPrice : price;
        const maxPrice = (this.widgetData.maxPrice > price) ? this.widgetData.maxPrice : price;
        Object.assign(this.widgetData, { price, supply, percent: cap24hrChange, marketCap: mktcap, minPrice, maxPrice });
        this.setAnimation();

        this.change(this.widgetData);
        this.price = price;
        this.currentPrice = price;
        this.currentPercent = cap24hrChange;

      });
  }

  private change(data: any, options?: any) {
    const res = options ? this.currentPrice - options.price : (data.price / 100) * data.percent;
    this.widgetData.change = Math.abs(res);
  }

  private calculatePersentage(historyPrice) {
    const res = (this.currentPrice * 100 / historyPrice) - 100;
    this.widgetData.percent = res;
  }

  private containArray(values): Array<any> {
    return values.map((key) => [new Date(key.time * 1000), Number(key.close)]);
  }

  private setAnimation(price?: number) {
    if (this.price && this.widgetData.percent > 0) {
      this.triangleClass = 'fa-caret-up up';
      this.animate = 'animated fadeInUp';
    }
    if (this.price && this.widgetData.percent < 0) {
      this.triangleClass = 'fa-caret-down down';
      this.animate = 'animated fadeInDown';
    }
  }

  private changableFontSize() {
    const width =  window.innerWidth / 50;
   return width.toString();
  }

  private initChart(values: Array<any>): void {
    /** set poin color from chart */
    this.styleContainer.nativeElement.innerHTML = '<style>' +
      '#bitcoin-price-chart circle + g > circle:last-of-type {stroke: ' +
      this.theme.point +
      '!important;}' +
      '</style>';

    /** chart setting + data + chart type */
    this.chartRenderData = {
      chartType: 'AreaChart',
      dataTable: [['time', 'price'], ...values],
      options: {
        backgroundColor: 'none',
        pointSize: 9,
        focusTarget: 'category',
        lineWidth: 3,
        explorer: {
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 4.0
        },
        legend: {
          position: 'none'
        },
        tooltip: {
          trigger: 'none',
        },
        hAxis: {
          gridlines: {
            color: this.theme.axisColor,
            count: 6
          },
          textStyle: {
            color: this.theme.color,
            fontName: 'Open Sans',
            fontSize: this.changableFontSize()
          },
        },
        vAxis: {
          viewWindowMode: 'explicit',
          baselineColor: 'none',
          gridlines: {
            color: this.theme.axisColor,
            count: 12
          },
          textStyle: {
            color: this.theme.color,
            fontName: 'Open Sans',
            fontSize: '13'
          },
        },
        series: [{
            color: this.theme.series,
            areaOpacity: '.3',
        }],
        crosshair: {
          color: this.theme.crosshair,
          trigger: 'focus',
          orientation: 'vertical'
        },
        chartArea: {
          top: 20,
          left: 70,
          width: '100%',
          height: '85%',
          backgroundColor: 'none'
        }
      },
    };
  }


  private calcLimit() {
    const from = moment().subtract(6, 'month');
    return Math.round(moment.duration(moment().diff(from)).as('days'));
  }

}
