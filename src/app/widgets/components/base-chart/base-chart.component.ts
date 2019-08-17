import {
  Component, EventEmitter, Input, Output, Renderer2,
  HostListener, ViewChild, ElementRef, OnInit
} from '@angular/core';
import { ScriptLoaderService } from '../../../shared/services/script-loader.service';

declare const google: any;

@Component({
  selector: 'app-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.css']
})
export class BaseChartComponent implements OnInit {

  @ViewChild('chartDiv') chartDiv: any;

  @HostListener('window:resize')
  resize() {
    if (this.loaded) {
      this.drawBasic();
    }
  }

  @Input()
  public set data(val) {
    this._data = val;
    if (this.loaded) {
      this.drawBasic();
    }

  }

  @Input() type: string;

  @Output() public mouseOver: EventEmitter<any> = new EventEmitter();
  @Output() public mouseOut: EventEmitter<any> = new EventEmitter<void>();

  private loaded = false;
  private _data: any;

  constructor(private loadService: ScriptLoaderService, private el: ElementRef) {
  }

  ngOnInit() {
    this.loadService.widgetLoad().subscribe((val) => {
      this.loadChart();
    });
  }

  private loadChart(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawBasic.bind(this));
    this.loaded = true;
  }

  private drawBasic(): void {

    const data = new google.visualization.arrayToDataTable(this._data.dataTable);

    const chart = new google.visualization[this._data.chartType](document.getElementById(this.type));

    chart.draw(data, this._data.options);

    google.visualization.events.addListener(chart, 'onmouseover', (event) => {
      this.mouseOver.emit(this.getData(event, data));
    });

    google.visualization.events.addListener(chart, 'onmouseout', (event) => {
      this.mouseOut.emit(this.getData(event, data));
    });

  }

  private getData(event: any, data) {
    const date = data.getValue(event.row, 0);
    const value = event.column ? data.getValue(event.row, event.column) : data.getValue(event.row, 1);
    return { date, value };
  }

}
