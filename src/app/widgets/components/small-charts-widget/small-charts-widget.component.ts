import { Component, Renderer2, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { styles } from '../../../shared/models/styles';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-small-charts-widget',
  templateUrl: './small-charts-widget.component.html',
  styleUrls: ['./small-charts-widget.component.css']
})
export class SmallChartsWidgetComponent implements OnInit {

  public coinForChart1: string;
  public coinForChart2: string;
  public coinForChart3: string;

  public activeCoinForChart1: string;
  public activeCoinForChart2: string;
  public activeCoinForChart3: string;

  public style: any;
  public currentStyle: any;
  public theme: string;

  private now: Date;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.now = new Date();

    this.coinForChart1 = 'XRP';
    this.coinForChart2 = 'LTC';
    this.coinForChart3 = 'BCH';

    this.activeCoinForChart1 = 'Ripple';
    this.activeCoinForChart2 = 'Litecoin';
    this.activeCoinForChart3 = 'Bitcoin Cash';

    /** get style for current widget */
    this.style = styles.find(o => o.widgetName === 'small-charts-widget');
    this.theme = this.style.theme[this.route.snapshot.queryParams.color ||  'white'];
    // this.currentStyle = this.style.styles.widgetStyles[this.route.snapshot.queryParams.style].name;

    /** listen changes for this widget */
    this.renderer.listen(window, 'message', ({ data }: any) => {
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
      }
      if (data.type === 'style_update') {
        this.currentStyle = data.style;
      }
    });
  }

}
