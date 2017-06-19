import { Pipe, PipeTransform } from '@angular/core';
import { SkyNumeric } from './numeric';

/*
 * Shortens numbers to 1K, 1M, 1B, 1T and can format for currency
 * Currency and ISO are optional, defaulting to false and USD respectively
 * Usage:
 *   number_expression | skyNumeric[:digits[:currency[:iso]]]
 * Example:
 *  {{ 1075 | skyNumeric:1:true:USD}}
 *  formats to: $1.1K
 * Example:
 *  {{ 2075000 | skyNumeric:2:false:USD}}
 *  formats to: 2.08M
*/
@Pipe({
  name: 'skyNumeric'
})
export class SkyNumericPipe implements PipeTransform {
  public transform(value: number, digits: number,
    currency: boolean = false, iso: string = 'USD'): string {
    return SkyNumeric.formatNumber(value, digits, currency, iso);
  }
}
