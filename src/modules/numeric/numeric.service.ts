import { Injectable } from '@angular/core';

import { SkyNumeric } from './numeric';

@Injectable()
export class SkyNumericService {
  public formatNumber(value: number, digits: number,
  currency: boolean = false, iso: string = 'USD'): string {
    return SkyNumeric.formatNumber(value, digits, currency, iso);
  }
}
