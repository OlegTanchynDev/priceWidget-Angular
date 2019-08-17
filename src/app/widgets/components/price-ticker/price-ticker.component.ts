import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-price-ticker',
  templateUrl: './price-ticker.component.html',
  styleUrls: ['./price-ticker.component.css']
})
export class PriceTickerComponent implements OnInit, OnDestroy {
  @ViewChild('styleContainer') styleContainer: any;

  public loader = true;
  public coin = 'BTC';
  public date: Date;
  public time: number;
  public price: number;
  public theme: any;
  public values: any;
  public widgetData: any;
  private now: number;
  private style: any;
  private isRealtimeUpdate: boolean;

  private chartRenderData: any;
  private updServiceSubs: any;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) {
  }

  /**
   * @todo "Create themes for widget Price Ticker"
   */
  ngOnInit() {

  /** Needed for the perfect animation */
    this.now = Date.now();

    this.style = styles.find(o => o.widgetName === 'price-ticker');
    this.theme = this.style.theme[this.route.snapshot.queryParams.color || 'white'];
    this.isRealtimeUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || true];
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
        this.isRealtimeUpdate = data.realtime;
        if (this.isRealtimeUpdate) {
          this.getDetails(this.coin);
        } else if (this.updServiceSubs) {
          this.updServiceSubs.unsubscribe()
        }
      }
    });

    this.getDetails();
  }

  ngOnDestroy(): void {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }
  }

  public mouseOver(event) {
    this.price = event.value;
    this.date = event.date;
  }

  public mouseOut() {
    this.price = this.widgetData.price;
    this.date = new Date();
  }

  /** Get first load chart data */
  private getDetails(coin?: string) {
    this.dataService.getCoinDetails(coin, undefined, coin ? [coin] : ['BTC'])
      .subscribe(({ historyPrice, marketCap, minPrice, maxPrice, price }) => {
        this.widgetData = { minPrice, maxPrice, price, historyPrice };
        this.price = this.widgetData.price;
        this.initChart(this.containArray(historyPrice));
        this.loader = false;
        if (this.isRealtimeUpdate) {
          this.getUpdates(coin);
        }
      });
  }


  /** Get real-time data changes */
  private getUpdates(coin?: string) {

    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

    this.updServiceSubs = this.dataService.getUpdates(coin)
      .pipe(filter(data => !!data))
      .subscribe(({ msg : { price } }) => {
        const minPrice = (this.widgetData.minPrice > price) ? price : this.widgetData.minPrice;
        const maxPrice = (this.widgetData.maxPrice < price) ? price : this.widgetData.maxPrice;
        Object.assign(this.widgetData, { price, minPrice, maxPrice });
      });
  }

  private containArray(values): Array<any> {
    return values.map((key) => [new Date(key.time * 1000), Number(key.close)]);
  }

  private initChart(values: Array<any>): void {
    /** set poin color from chart */
    this.styleContainer.nativeElement.innerHTML = '<style>' +
      '#price-ticker circle + g > circle:last-of-type {stroke: ' +
      this.theme.point +
      '!important;}' +
      '</style>';

    /** chart setting + data + chart type */
    this.values = values;
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
        legend: {
          position: 'none'
        },
        tooltip: {
          trigger: 'none',
        },
        hAxis: {
          gridlines: {
            color: 'none',
          },
          textPosition: 'none',
          baselineColor: 'none',
        },
        vAxis: {
          gridlines: {
            color: 'none',
          },
          textPosition: 'none',
          baselineColor: 'none',
        },
        series: [{
          areaOpacity: '0',
          color: this.theme.series,
        }],
        crosshair: {
          color: this.theme.crosshair,
          trigger: 'focus',
          orientation: 'vertical'
        },
        chartArea: {
          top: 0,
          left: 0,
          width: '100%',
          height: '99%',
        }
      },
    };
  }
}
