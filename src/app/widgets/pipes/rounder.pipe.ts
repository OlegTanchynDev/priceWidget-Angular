import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';

@Pipe({
  name: 'rounder'
})
export class RounderPipe implements PipeTransform {

  transform(value: number | string, digits: number = 2, abbreviation: boolean, satoshi?: boolean): any {
    if (isNil(value)) { return '--'; }
    if (typeof(value) === 'string') { value = parseFloat(value)}
    if (satoshi) { value /= 100000000; }
    if (!abbreviation && value > 999999999) { return (value / 1000000000).toFixed(digits) + 'B'; }
    if (!abbreviation && value > 999999) { return (value / 1000000).toFixed(digits) + 'M'; }
    return value.toFixed(digits);
  }

}
