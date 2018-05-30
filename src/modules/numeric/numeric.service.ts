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

@Injectable()
export class SkyNumericService {
  public shortSymbol: string;

  private symbolIndex = [
    { value: 1E12, symbol: SkyResources.getString('number_trillion_abrev') },
    { value: 1E9, symbol: SkyResources.getString('number_billion_abrev') },
    { value: 1E6, symbol: SkyResources.getString('number_million_abrev') },
    { value: 1E3, symbol: SkyResources.getString('number_thousands_abrev') }
  ];

  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe
  ) { }

  /**
   * Shortens with or without symbol depending on value of number.
   * @param value The number to format.
   * @param options Format options.
   */
  public formatNumber(
    value: number,
    options: NumericOptions
  ): string {
    this.shortSymbol = '';
    const regexp = /\.0+$|(\.[0-9]*[1-9])0+$/;

    // Checks both positive and negative of value to ensure negative numbers are shortened.
    const found = this.symbolIndex.find(si => value >= si.value || -value >= si.value);

    let output: string;
    if (found) {
      output = Number(
        Math.round(parseFloat((value / found.value) + `e${options.digits}`))
        + `e-${options.digits}`
      ).toString().replace(regexp, '$1') + found.symbol;
    } else {
      output = Number(
        Math.round(parseFloat(`${value}e${options.digits}`))
        + `e-${options.digits}`
      ).toString().replace(regexp, '$1');
    }

    this.storeShortenSymbol(output);

    switch (options.format.toLowerCase()) {
      case 'currency':
      // In a case where a decimal value was not shortened and the digit input is 2 or higher,
      // it forces 2 digits.
      // For example, this prevents a value like $15.50 from displaying as $15.5.
      // Note: This will need to be reviewed if we support currencies with three decimal digits
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

      default:
      output = this.decimalPipe.transform(
        parseFloat(output),
        `1.0-${options.digits}`
      );
      break;
    }

    output = this.replaceShortenSymbol(output);

    return output;
  }

  // Stores the symbol added from shortening to reapply later
  private storeShortenSymbol(sValue: string): void {
    const symbols = this.symbolIndex.map(s => s.symbol);
    const regexp = new RegExp(symbols.join('|'), 'ig');
    const match = sValue.match(regexp);
    if (match) {
      this.shortSymbol = match.toString();
    }
  }

  // Must have previously called storeShortenSymbol to have something to replace.
  // Finds the last number in the formatted number,
  // gets the index of the position after that character and re-inserts the symbol.
  // works regardless of currency symbol position
  private replaceShortenSymbol(value: string): string {
    const result = /(\d)(?!.*\d)/g.exec(value);
    const pos = result.index + result.length;
    const output = value.substring(0, pos) + this.shortSymbol + value.substring(pos);
    return output;
  }
}
