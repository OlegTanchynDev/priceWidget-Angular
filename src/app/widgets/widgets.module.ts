import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsRoutingModule } from './widgets.routing.module';

import {
  AltcoinPriceListsWidgetComponent,
  AltcoinPriceWidgetComponent,
  AnimatedMarketTickerWidgetComponent,
  BaseChartComponent,
  BitcoinPriceChartComponent, BitcoinPriceWidgetComponent,
  CryptocurrencyMarketComponent,
  PeriodicPriceChartComponent,
  PriceTickerComponent,
  PricingIndexComponent,
  SimpleBitcoinPriceComponent,
  SingleTickerComponent,
  TickerWidgetComponent,
  SquareWidgetComponent,
  SmallChartComponent,
  ComparisonWidgetComponent,
  LeaderboardsComponent,
  LineWidgetComponent,
  CryptoCalculationComponent,
  SmallChartWidgetComponent,
  SmallChartsWidgetComponent
} from './components';
import { RounderPipe } from './pipes/rounder.pipe';
import { AgoPipe } from './pipes/ago.pipe';
import { SymbolPipePipe } from './pipes/symbol-pipe.pipe';
import { DataServiceService } from './services/data-service.service';
import { SanitizerPipe } from './pipes/sanitizer.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    WidgetsRoutingModule,
    FormsModule,
  ],
  declarations: [
    AltcoinPriceListsWidgetComponent,
    AltcoinPriceWidgetComponent,
    AnimatedMarketTickerWidgetComponent,
    BaseChartComponent,
    BitcoinPriceChartComponent,
    BitcoinPriceWidgetComponent,
    CryptocurrencyMarketComponent,
    PeriodicPriceChartComponent,
    PricingIndexComponent,
    PriceTickerComponent,
    SimpleBitcoinPriceComponent,
    SingleTickerComponent,
    TickerWidgetComponent,
    SquareWidgetComponent,
    SmallChartComponent,
    ComparisonWidgetComponent,
    LeaderboardsComponent,
    LineWidgetComponent,
    CryptoCalculationComponent,
    SmallChartWidgetComponent,
    SmallChartsWidgetComponent,
    AgoPipe,
    RounderPipe,
    SanitizerPipe,
    SymbolPipePipe
  ],
  exports: [
    AltcoinPriceListsWidgetComponent,
    AltcoinPriceWidgetComponent,
    AnimatedMarketTickerWidgetComponent,
    BaseChartComponent,
    BitcoinPriceChartComponent,
    BitcoinPriceWidgetComponent,
    CryptocurrencyMarketComponent,
    PeriodicPriceChartComponent,
    PricingIndexComponent,
    PriceTickerComponent,
    SimpleBitcoinPriceComponent,
    SingleTickerComponent,
    TickerWidgetComponent,
    SquareWidgetComponent,
    SmallChartComponent,
    ComparisonWidgetComponent,
    LeaderboardsComponent,
    LineWidgetComponent,
    CryptoCalculationComponent,
    SmallChartComponent,
    SmallChartWidgetComponent,
    SmallChartsWidgetComponent,
    SanitizerPipe,
    FormsModule,
  ],
  providers: [
    DataServiceService
  ]
})
export class WidgetsModule {
}
