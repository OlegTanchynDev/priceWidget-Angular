import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AltcoinPriceListsWidgetComponent,
  AltcoinPriceWidgetComponent,
  AnimatedMarketTickerWidgetComponent,
  BitcoinPriceChartComponent,
  BitcoinPriceWidgetComponent,
  CryptocurrencyMarketComponent,
  PeriodicPriceChartComponent,
  PriceTickerComponent,
  PricingIndexComponent,
  SimpleBitcoinPriceComponent,
  TickerWidgetComponent,
  SquareWidgetComponent,
  ComparisonWidgetComponent,
  SmallChartComponent,
  LineWidgetComponent,
  LeaderboardsComponent,
  CryptoCalculationComponent,
  SmallChartWidgetComponent,
  SmallChartsWidgetComponent
} from './components';
import { SingleTickerComponent } from './components/single-ticker/single-ticker.component';

const routes: Routes = [

  { path: 'widgets/altcoin-price-widget', component: AltcoinPriceWidgetComponent },
  { path: 'widgets/altcoin-price-lists-widget', component: AltcoinPriceListsWidgetComponent },
  { path: 'widgets/animated-market-ticker-widget', component: AnimatedMarketTickerWidgetComponent },
  { path: 'widgets/bitcoin-price-chart', component: BitcoinPriceChartComponent },
  { path: 'widgets/bitcoin-price-widget', component: BitcoinPriceWidgetComponent },
  { path: 'widgets/cryptocurrency-market', component: CryptocurrencyMarketComponent },
  { path: 'widgets/periodic-price-chart', component: PeriodicPriceChartComponent },
  { path: 'widgets/price-ticker', component: PriceTickerComponent },
  { path: 'widgets/pricing-index', component: PricingIndexComponent },
  { path: 'widgets/simple-bitcoin-price', component: SimpleBitcoinPriceComponent },
  { path: 'widgets/single-ticker', component: SingleTickerComponent },
  { path: 'widgets/ticker-widget', component: TickerWidgetComponent },
  { path: 'widgets/square-widget', component: SquareWidgetComponent },
  { path: 'widgets/small-chart', component: SmallChartComponent },
  { path: 'widgets/comparison-widget', component: ComparisonWidgetComponent },
  { path: 'widgets/leaderboards', component: LeaderboardsComponent},
  { path: 'widgets/line-widget', component: LineWidgetComponent},
  { path: 'widgets/crypto-calculation', component: CryptoCalculationComponent },
  { path: 'widgets/small-chart-component', component: SmallChartWidgetComponent},
  { path: 'widgets/small-charts-widget', component: SmallChartsWidgetComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WidgetsRoutingModule {
}
