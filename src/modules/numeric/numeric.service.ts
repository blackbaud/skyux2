// #region imports
import {
  Injectable
} from '@angular/core';

import {
  CurrencyPipe,
  DecimalPipe
} from '@angular/common';

import {
  SkyResources
} from '../resources';

import {
  NumericOptions
} from './numeric.options';

import {
  SkyNumericSymbol
} from './numeric-symbol';
// #endregion

@Injectable()
export class SkyNumericService {
  public shortSymbol: string;

  private symbolIndex: SkyNumericSymbol[] = [
    { value: 1E12, label: SkyResources.getString('number_trillion_abrev') },
    { value: 1E9, label: SkyResources.getString('number_billion_abrev') },
    { value: 1E6, label: SkyResources.getString('number_million_abrev') },
    { value: 1E3, label: SkyResources.getString('number_thousands_abrev') }
  ];

  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe
  ) { }

  /**
   * Shortens with or without symbol (K/M/B/T) depending on value of number.
   * @param value The number to format.
   * @param options Format options.
   */
  public formatNumber(
    value: number,
    options: NumericOptions
  ): string {
    const decimalPlaceRegExp = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const symbol: SkyNumericSymbol = this.symbolIndex.find((si) => {
      // Checks both positive and negative of value to ensure
      // negative numbers are shortened.
      return (value >= si.value || -value >= si.value);
    });

    let output: string;

    if (symbol) {
      output = Number(
        // Using Math.round to ensure accurate rounding compared to toFixed.
        Math.round(parseFloat((value / symbol.value) + `e${options.digits}`))
        + `e-${options.digits}`
      ).toString().replace(decimalPlaceRegExp, '$1') + symbol.label;
    } else {
      output = Number(
        Math.round(parseFloat(`${value}e${options.digits}`))
        + `e-${options.digits}`
      ).toString().replace(decimalPlaceRegExp, '$1');
    }

    this.storeShortenSymbol(output);

    // Checks the string entered for format. Using toLowerCase to ignore case.
    switch (options.format.toLowerCase()) {

      // In a case where a decimal value was not shortened and the digit input is 2 or higher,
      // it forces 2 digits.
      // For example, this prevents a value like $15.50 from displaying as $15.5.
      // Note: This will need to be reviewed if we support currencies with three decimal digits.
      case 'currency':
      const isShortened = (value > this.symbolIndex[this.symbolIndex.length - 1].value);
      const isDecimal = (value % 1 !== 0);

      let digits: string;
      if (!isShortened && isDecimal && options.digits >= 2) {
        digits = `1.2-${options.digits}`;
      } else {
        digits = `1.0-${options.digits}`;
      }

      output = this.currencyPipe.transform(
        parseFloat(output),
        options.iso,
        true,
        digits
      );
      break;

      // The following is a catch-all to ensure that if
      // anything but currency (or a future option) are entered,
      // it will be treated like a number.
      default:
      // Ensures localization of the number to ensure comma and
      // decimal separators are correct.
      output = this.decimalPipe.transform(
        parseFloat(output),
        `1.0-${options.digits}`
      );
      break;
    }

    output = this.replaceShortenSymbol(output);

    return output;
  }

  /**
   * Stores the symbol added from shortening to reapply later.
   * @param value The string to derive the shorten symbol from.
   */
  private storeShortenSymbol(value: string): void {
    const symbols: string[] = this.symbolIndex.map(s => s.label);
    const regexp = new RegExp(symbols.join('|'), 'ig');
    const match = value.match(regexp);
    this.shortSymbol = (match) ? match.toString() : '';
  }

  /**
   * Must have previously called storeShortenSymbol to have something to replace.
   * Finds the last number in the formatted number, gets the index of the position
   * after that character and re-inserts the symbol.
   * Works regardless of currency symbol position.
   * @param value The string to modify.
   */
  private replaceShortenSymbol(value: string): string {
    const result = /(\d)(?!.*\d)/g.exec(value);
    const pos = result.index + result.length;
    const output = value.substring(0, pos) + this.shortSymbol + value.substring(pos);

    return output;
  }
}
