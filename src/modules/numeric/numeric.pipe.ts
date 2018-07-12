import { Pipe, PipeTransform } from '@angular/core';
import { SkyNumericService } from './numeric.service';
import { NumericOptions } from './numeric.options';

/*
 * Shortens numbers to 1K, 1M, 1B, 1T and can format for currency
 * All five arguments in the options object, Digits, format, iso, truncate, truncateAfter are optional,
 * defaulting to 1, number and USD, true, 0 respectively
 * Usage:
 *  number_expression | skyNumeric[:numbericOptions]]]
 *
 *  options is an object to be passed in with the following parameters:
 *    digits
 *    format
 *    iso
 *    truncate
 *    truncateAfter
 * Example:
 *  {{ 1075 | skyNumeric:{digits: 1, format: 'currency', iso: 'USD'} }}
 *  formats to: $1.1K
 * Example:
 *  {{ 2075000 | skyNumeric:{digits: 2} }}
 *  formats to: 2.08M
 * Example:
 *  {{ 2075000 | skyNumeric:{truncate: false} }}
 *  formats to: 2,075,000
 *  Example:
 *  {{ 9500 | skyNumeric:{truncateAfter: 10000} }}
 *  formats to: 9,500
 *  Example:
 *  {{ 10001 | skyNumeric:{truncateAfter: 10000} }}
 *  formats to: 10K
 * Note: Be sure you have a space between the curly bracket surrounding the options object
 * and the two curly brackets closing the pipe or it will not work.  Thanks angular pipes.
*/
@Pipe({
  name: 'skyNumeric'
})
export class SkyNumericPipe implements PipeTransform {

  constructor(
    private readonly skyNumeric: SkyNumericService
  ) { }

  public transform(value: number, optionsObject: any): string {
    let options = new NumericOptions();
    if (optionsObject) {
      if (optionsObject.digits !== undefined) {
        options.digits = optionsObject.digits;
      }
      if (optionsObject.format !== undefined) {
        options.format = optionsObject.format;
      }
      if (optionsObject.iso !== undefined) {
        options.iso = optionsObject.iso;
      }
      if (optionsObject.truncate !== undefined) {
        options.truncate = optionsObject.truncate;
      }
      if (optionsObject.truncateAfter !== undefined) {
        options.truncateAfter = optionsObject.truncateAfter;
      }
    }
    return this.skyNumeric.formatNumber(value, options);
  }
}
