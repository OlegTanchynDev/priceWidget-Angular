import { Component, OnDestroy, OnInit, Renderer2, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';

import { historyBitcoinPriceWidget } from '../../../shared/models/hystory';
import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';
import { type } from 'os';

@Component({
  selector: 'app-small-chart-widget',
  templateUrl: './small-chart-widget.component.html',
  styleUrls: ['./small-chart-widget.component.css']
})
export class SmallChartWidgetComponent implements OnInit, OnDestroy {
  @ViewChild('styleContainer') styleContainer: any;

  public loader = true;
  public theme: any;
  public style: any;

  @Input()
  coin: string;

  @Input()
  type: string;

  @Input()
  activeCoin: string;

  public typeChart: string;

  public price: number;
  public date: Date;
  public widgetData: any;
  public triangleClass: string;
  public animate: string;
  public chartRenderData: any;
  public history: any;
  public activePeriod: any = historyBitcoinPriceWidget[0];
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;

  private now: number;
  private updServiceSubs: Subscription;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) {
  }

  public ngOnInit() {

    /** Needed for the perfect animation */
    this.now = Date.now();

    this.typeChart = this.type ? 'small-chart-widget-' + this.type : 'small-chart-widget-' + 'BTC';

    /** Customize widget */
    this.style = styles.find(o => o.widgetName === 'small-charts-widget');
    this.theme = this.style.theme[this.route.snapshot.queryParams.color || 'white'];
    this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || 'highlight'];
    this.renderer.listen(window, 'message', ({data}: any) => {
      if (data.type === 'coin_change') {
        this.coin = data.coin;
        this.getDetails(data.coin);
      }
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
        if (this.widgetData.historyPrice) {
          this.initChart(this.containArray(this.widgetData.historyPrice));
        }
      }
      if (data.type === 'realtime_update') {
        this.getDetails(this.coin);
        this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[data.realtime];
      }
    });

    /** Implements params for buttons and date text fields */
    this.history = this.forEachPeriod(historyBitcoinPriceWidget, this.style.hiddenPeriod);
    this.getDetails(this.coin);
  }

  public ngOnDestroy(): void {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

  }

  public loadingHistory(param: any) {
    this.activePeriod = param;
    /** Change graphic data depend on params */
    this.dataService.loadHistoryData(param.period, this.calcLimit(param), param.aggregate, this.coin)
      .subscribe(data => {
        if (data.Data) {
          this.initChart(this.containArray(data.Data));
        }
        this.widgetData.dateFrom = this.calcDate(param.name, param.amount, param.unit, data.Data[0].time);
      });
  }

  public clearAnimationClass() {
    this.animate = null;
  }

  /** Get first load chart data */
  private getDetails(coin?: string) {
    this.dataService.getCoinDetails(
      coin || 'BTC',
      'histominute',
      coin ? [coin] : ['BTC'],
      'USD',
      ['USD'],
      60,
      1)
      .subscribe(({historyPrice, price, percent, supply, blocks}) => {
        this.widgetData = {price, percent, supply, blocks, historyPrice};
        this.setAnimation(percent);
        this.price = price;
        this.date = new Date();
        if (historyPrice) {
          this.initChart(this.containArray(historyPrice));
        }
        this.loader = false;
        this.getUpdates(coin);
      });
  }

  /** Get real-time data changes */
  private getUpdates(coin?: string) {

    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

    this.updServiceSubs = this.dataService.getUpdates(coin)
      .pipe(filter(data => !!data))
      .pipe(filter(({msg: {price}}) => price !== this.price))
      .pipe(filter(() => {
        if (Date.now() - this.now >= 1) {
          this.now = Date.now();
          return true;
        }
      }))
      .subscribe(({msg}) => {
        const {cap24hrChange, price } = msg;
        Object.assign(this.widgetData, {price, percent: cap24hrChange });
        this.change(this.widgetData);
        this.setAnimation(cap24hrChange);
        this.price = price;
      });
  }

  private change(data: any) {
    const res = (data.price / 100) * data.percent;
    this.widgetData.change = Math.abs(res);
  }

  private containArray(values: any[]): Array<any> {
    console.log('values', values);
    return values.map((key) => [new Date(key.time * 1000), Number(key.close)]);
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

  private initChart(values: Array<any>): void {
    /** set poin color from chart */
    this.styleContainer.nativeElement.innerHTML = '<style>' +
      '#bitcoin-price-widget g > circle:last-of-type {stroke: ' +
      this.theme.point +
      '!important;}' +
      '</style>';

    /** chart setting + data + chart type */
    this.chartRenderData = {
      chartType: 'AreaChart',
      dataTable: [['time', 'price'], ...values],
      options: {
        backgroundColor: 'none',
        pointSize: 5,
        focusTarget: 'category',
        explorer: {
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 4.0
        },
        hAxis: {
          gridlines: {
            color: 'none',
          },
          textStyle: {
            color: this.theme.color,
            fontName: 'Open Sans',
            fontSize: '12'
          },
          format: 'dd/MM/yy',
        },
        vAxis: {
          gridlines: {
            color: this.theme.axisColor,
            width: '1px',
            count: 4
          },
          textStyle: {
            color: this.theme.color,
            fontName: 'Open Sans',
            fontSize: '12'
          },
          format: '$####',
        },
        series: [{
          areaOpacity: '0',
          pointsVisible: false,
          color: this.theme.series,
        }],
        crosshair: {
          color: this.theme.crosshair,
          trigger: 'focus',
          orientation: 'vertical'
        },
        chartArea: {
          top: 20,
          left: 40,
          width: '100%',
          height: '85%',
        }
      },
    };
  }

  private calcDate(period?: any, amount?: any, unit?: any, fromDateBegin?: any) {
    if (period && period !== 'All') {
      return moment().subtract(amount, unit).format('DD/MM/YYYY');
    } else if (period === 'All') {
      return moment.unix(fromDateBegin).format('DD/MM/YYYY');
    } else {
      return moment().format('DD/MM/YYYY');
    }
  }

  private calcLimit({amount, unit, units, name}: any) {
    const from = moment().subtract(amount, unit);
    return (name === 'All') ? 1000000 : Math.round(moment.duration(moment().diff(from)).as(units));
  }
  private forEachPeriod(periodArr: any, haystack?: any) {
    return haystack ? periodArr.filter(period => !haystack.includes(period.name)) : periodArr;
  }
}
