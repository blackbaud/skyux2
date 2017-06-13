import { CurrencyPipe } from '@angular/common';
import { SkyResources } from '../resources/resources';

export class SkyAutonumeric {
  public static formatNumber(value: number, digits: number,
    currency: boolean = false, iso: string = 'USD'): string {

    let si = [
      { value: 1E12, symbol: SkyResources.getString('number_trillion_abrev') },
      { value: 1E9, symbol: SkyResources.getString('number_billion_abrev') },
      { value: 1E6, symbol: SkyResources.getString('number_million_abrev') },
      { value: 1E3, symbol: SkyResources.getString('number_thousands_abrev') }
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i: number;
    let sValue: string;
    let shortSymbol: string = '';

    // Shortens with or without symbol (K/M/B/T) depending on value of number
    for (i = 0; i < si.length; i++) {
      // Checks both positive and negative of value to ensure negative numbers are shortened
      if (value >= si[i].value || -value >= si[i].value) {
        // Using Math.round to ensure accurate rounding compared to toFixed
        sValue = Number(Math.round(parseFloat((value / si[i].value) + 'e' + digits))
          + 'e-' + digits).toString().replace(rx, '$1') + si[i].symbol;
        break;
      } else {
        sValue = Number(Math.round(parseFloat(value + 'e' + digits))
          + 'e-' + digits).toString().replace(rx, '$1');
      }
    }

    if (currency) {
      // Stores the symbol added from shortening (K/M/B/T) to reapply later
      rx = /[a-z]/ig;
      if (sValue.match(rx)) {
        shortSymbol = sValue.match(rx).toString();
      }

      // Currency formatting via Currency Pipe. In a case where, value was not shortened
      // AND there are "cents" in the value AND the digit input is 2 or higher, it forces 2 digits.
      // This prevents a value like $15.50 from displaying as $15.5
      // Note: This will need to be reviewed if we support currencies with three decimal digits
      if (value < si[si.length - 1].value && value % 1 !== 0 && digits >= 2) {
        sValue = new CurrencyPipe(iso).transform(parseFloat(sValue), iso, true, '1.2-' + digits);
      } else {
        sValue = new CurrencyPipe(iso).transform(parseFloat(sValue), iso, true, '1.0-' + digits);
      }

      // Finds the last number in the formatted number,
      // gets the index of the position after that character and re-inserts the symbol.
      // works regardless of currency symbol position
      let r = /(\d)(?!.*\d)/g.exec(sValue);
      i = r.index + r.length;
      sValue = sValue.substring(0, i)
        + shortSymbol + sValue.substring(i);
    }

    // Returns the formatted value
    return sValue;
  }

}
