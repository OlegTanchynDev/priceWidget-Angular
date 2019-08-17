import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, ReplaySubject, timer } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public socket = socketIo(environment.socket.host);
  public updateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  [x: string]: any;

  constructor(private http: HttpClient) {
    this.initSocket();
  }

  /**
   * @todo move all static params to options.json (first, create options.json)
   */
  public getPriceHistory(periodName: string, limit: string | number, aggregate: string | number, coin: string, currency: string )
    : Observable<any> {
    return this.http
      .get(`${environment.cryptocompare.host}${periodName}?fsym=${coin}&tsym=${currency}&limit=${limit}&aggregate=${aggregate}`);
  }

  public getCoinDetails(
    coin: string = 'BTC',
    periodName: string = 'histominute',
    coins: string[] = ['BTC'],
    currency: string = 'USD',
    currencies: string[] = ['USD'],
    limit: string | number = 60,
    aggregate: string | number = 1): Observable<any> {
    return forkJoin([
      this.getPriceHistory(periodName, limit, aggregate, coin, currency),
      this.getFirstCoinDetails(coins, currencies),
      this.convertCoins()
    ])
      .pipe(map((data) => this.parseData(data, coin, currency)));
  }


  public convertCoins() {
    return this.http
      .get(`${environment.cryptocompare.host}pricemulti?fsyms=ETH,BTC,ZEC,DASH,LTC,ETC,XMR&tsyms=USD,EUR,XBT`);
  }

  public getFullCoinsList(
    withTotal: boolean = true,
    page: number = 1,
    order: string = 'desc',
    limit: number = 40
  ) {
    return (withTotal) ?
      forkJoin(this.getCoinsList(page, order, limit), this.getTotalNumberOfCoins()) :
      this.getCoinsList(page, order, limit);
  }

  public getFirstCoinDetails(coins: string[] = ['BTC'], currencies: string[] = ['USD', 'BTC']): Observable<any> {
    return this.http.get(`${environment.cryptocompare.host}pricemultifull?fsyms=${coins.join(',')}&tsyms=${currencies.join(',')}`);
  }

  public getUpdates(par: string = 'BTC') {
    if (!this[par]) {
      this[par] = new ReplaySubject();
    }
    return this[par].asObservable();
  }

  public loadHistoryData(
    periodName: string,
    limit: string | number,
    aggregate: string | number = '1',
    coin: string = 'BTC',
    currency: string = 'USD'): Observable<any> {
    return this.getPriceHistory(periodName, limit, aggregate, coin, currency);
  }

  public getAltcoinsPrices (
    timestamp: number,
    coins: string[],
    currency: string[] = ['USD', 'BTC']
  ) {

    const requests = [
      this.getFirstCoinDetails(coins, currency),
    ];
    coins.forEach(coin =>
      requests.push(
        this.http.get(`${environment.cryptocompare.host}pricehistorical?fsym=${coin}&tsyms=${currency[0]}&ts=${timestamp}`)
      )
  );
    requests.push(this.getCoinsNames(coins));
    return forkJoin(requests)
      .pipe(map((data) => {
        const current = data[0].RAW;
        const previous = {};
        for (let i = 1; i < data.length - 1; i++) {
          const name = Object.keys(data[i])[0];
          Object.assign(previous, {[name]: data[i][name]});
        }
        return { previous, current, names: data[data.length - 1].Data };
      }));

  }

  private getCoinsNames (
    coins: string[]
  ) {
    return this.http.get(`${environment.cryptocompare.host}coin/generalinfo?fsyms=${coins.join(',')}&tsym=USD`);
  }

  private getTotalNumberOfCoins() {
    return this.http.get(`${environment.coingecko.host}global`);
  }

  private getCoinsList(
    page: number,
    order: string,
    limit: number
  ) {
    return this.http.get(`${environment.coingecko.host}coins?order=market_cap_${order}&per_page=${limit}&page=${page}`);
  }

  private initSocket() {
    this.socket.on('trades', (data: any) => {
      if (this[data.coin]) {
        this[data.coin].next(data);
      }
    });
  }

  private parseData(data: any, coin: string, currency: string) {
    const [{ Data: historyPrice }, { RAW: coinInfo }, converter] = data;
    const {
      MKTCAP: marketCap,
      LOWDAY: minPrice,
      HIGHDAY: maxPrice,
      PRICE: price,
      CHANGEPCT24HOUR: percent,
      SUPPLY: supply,
      TOTALVOLUME24HTO: blocks
    } = coinInfo[coin][currency];

    const priceInBtc = (coinInfo[coin]['BTC']) ? coinInfo[coin]['BTC']['PRICE'] : 0;

    return {historyPrice, marketCap, minPrice, maxPrice, price, percent, supply, blocks, converter, priceInBtc};
  }
}
