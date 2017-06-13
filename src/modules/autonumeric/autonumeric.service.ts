import { Injectable } from '@angular/core';

import { SkyAutonumeric } from './autonumeric';

@Injectable()
export class SkyAutonumericService {
  public formatNumber(value: number, digits: number,
  currency: boolean = false, iso: string = 'USD'): string {
    return SkyAutonumeric.formatNumber(value, digits, currency, iso);
  }
}
