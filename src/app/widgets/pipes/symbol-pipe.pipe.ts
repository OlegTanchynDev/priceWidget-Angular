import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbolPipe'
})
export class SymbolPipePipe implements PipeTransform {

  transform(value: any, symbol: string, position?: boolean): any {
    if (!value) { return; }
    if (value && !symbol) { return value; }
    if (value && symbol && position) { return symbol + value; }
    if (value && symbol && !position) { return value + symbol; }
  }

}
