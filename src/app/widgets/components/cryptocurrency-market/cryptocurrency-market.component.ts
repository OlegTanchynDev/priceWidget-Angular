import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { styles } from '../../../shared/models/styles';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cryptocurrency-market',
  templateUrl: './cryptocurrency-market.component.html',
  styleUrls: ['./cryptocurrency-market.component.css']
})
export class CryptocurrencyMarketComponent implements OnInit {

  public loader = true;
  public coins: any;
  public style: any;
  public page: any;
  public order = 'desc';
  public total: any;
  public theme: any;

  constructor(private dataService: DataServiceService, private renderer: Renderer2, private route: ActivatedRoute) { }

  ngOnInit() {
    this.load();
    this.style = styles.find(o => o.widgetName === 'cryptocurrency-market');
    this.theme = this.style.theme[this.route.snapshot.queryParams.color || 'white'];
    this.renderer.listen(window, 'message', ({ data }: any) => {
      if (data.type === 'color_change') {
        this.theme = this.style.theme[data.color];
      }
    });
  }

  public onOrder() {
    this.order = this.order === 'desc' ? 'asc' : 'desc';
    this.page = 1;
    this.load();
  }

  public onScroll({srcElement: { scrollHeight, offsetHeight, scrollTop }}) {
    if (scrollHeight - offsetHeight === scrollTop) {
      this.page += 1;
      this.load(true);
    }
  }

  private load(scroll?: boolean) {
    this.dataService.getFullCoinsList(!scroll, this.page, this.order)
      .subscribe((data) => {
        if (!scroll) {
          this.total = data[1].data.active_cryptocurrencies;
          this.coins = data[0];
        } else {
          this.coins = this.coins.concat(data);
        }
        this.loader = false;
      });
  }

}
