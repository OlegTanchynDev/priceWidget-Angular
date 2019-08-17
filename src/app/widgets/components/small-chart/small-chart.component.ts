import { Component, OnInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';
import { DatePipe } from '@angular/common';
import { element } from 'protractor';

@Component({
  selector: 'app-small-chart',
  templateUrl: './small-chart.component.html',
  styleUrls: ['./small-chart.component.css']
})
export class SmallChartComponent implements OnInit, OnDestroy {
  @Input() tagTheme: string;
  @Input() tagCoin: string;

  public triangleClass: String;
  public coin: 'BTC';
  public price: number;
  public values: any;
  public chartRenderData: object;
  public animate: string;
  public percent: number;
  public loader: boolean;
  public theme: any;
  public style: any;
  public currentStyle: any;
  public coinInfo: any;
  public currentChartValue: any;
  public isRealtimeHighlightUpdate: any;
  public highlightClass: any;


  private now: number;
  private updServiceSubs: Subscription;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.now = Date.now();

    this.loader = true;

    this.coin = this.route.snapshot.queryParams.currency || 'BTC';

     /** Set color theme */
     this.style = styles.find(o => o.widgetName === 'small-chart');
     this.theme = this.style.theme[this.tagTheme || this.route.snapshot.queryParams.color ||  'white'];
     this.isRealtimeHighlightUpdate = this.style.highlightRealtimeUpdate[this.route.snapshot.queryParams.realtime || 'highlight'];
     this.currentStyle = this.style.styles.widgetStyles[this.route.snapshot.queryParams.style || 'classic'].name;
     this.renderer.listen(window, 'message', ({ data }: any) => {
      if (data.type === 'coin_change') {
        this.coin = data.coin;
        this.getDetails(data.coin);
        this.loadImg();
      }
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
        this.initChart(this.containArray(this.values));
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

  ngOnDestroy() {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }
  }

  private initChart(values: Array<any>): void {
    this.chartRenderData = {
      chartType: 'LineChart',
      dataTable: [['time', 'price'], ...values],
      options: {
        backgroundColor: 'none',
        dataOpacity: 1,
        pointSize: 0,
        focusTarget: 'category',
        explorer: {
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 1.0
        },
        legend: {
          position: 'none'
        },
        tooltip: {
          trigger: 'none',
        },
        hAxis: {
          gridlines: { color: 'none' },
          textPosition: 'none'
        },
        vAxis: {
          viewWindowMode: 'explicit',
          gridlines: { color: 'none' },
          baselineColor: 'none',
          textPosition: 'none',
        },
        series: [{
          color: this.theme.series,
        }],
        chartArea: {
          top: 1,
          left: 0,
          width: '100%',
          height: '85%'
        },
        height: 50
      }
   };
  }

  private getDetails(coin?: string ) {
    this.dataService.getCoinDetails( coin || 'BTC', undefined, coin ? [coin] : ['BTC'], 'USD', ['USD'])
        .subscribe(({price, percent, historyPrice}) => {
          this.setAnimation(percent);
          this.currentChartValue = price;
          this.values = historyPrice;
          this.percent = percent;
          this.initChart(this.containArray(historyPrice));
          this.loader = false;
          this.getUpdates(coin);
          this.loadImg();
        });
  }

  private getUpdates(coin?: string) {
    if (this.updServiceSubs) {
      this.updServiceSubs.unsubscribe();
    }

    /** Raal-time data changes */
    this.updServiceSubs = this.dataService.getUpdates(coin || 'BTC')
      .pipe(filter(data => !!data))
      .pipe(filter(({ msg: { price } }) => price !== this.price))
      .pipe(filter(() => {
          if (Date.now() - this.now >= 1) {
            this.now = Date.now();
            return true;
          }
      })).subscribe(({ msg: { price, cap24hrChange } }) => {
        this.setAnimation(cap24hrChange);
        this.currentChartValue = price;
        this.percent = cap24hrChange;
        this.price = price;
        this.loadImg();
      });
  }

  private loadImg(scroll?: boolean) {
    this.dataService.getFullCoinsList(!scroll, 1, 'desc')
      .subscribe((data: Array<any>) => {
        data[0].find((dataElement): any => {
          if (dataElement.symbol === this.coin.toLocaleLowerCase()) {
            this.coinInfo = dataElement;
          }
        });
      });
  }

  private containArray(values): Array<any> {
    return values.map((key) => [new Date(key.time * 1000), Number(key.close)]);
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

  mouseOver(event: any) {
    this.currentChartValue = event.value;
  }

}
