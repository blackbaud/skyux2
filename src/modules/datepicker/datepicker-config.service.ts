import { Injectable } from '@angular/core';

@Injectable()
export class SkyDatepickerConfigService {
  public startingDay: number = 0;
  public minDate: Date;
  public maxDate: Date;
  public dateFormat: string = 'MM/DD/YYYY';
}
