import {
  Pipe,
  PipeTransform
} from '@angular/core';

import {
  DecimalPipe
} from '@angular/common';

import {
  SkyFormat
} from '../format';

import {
  SkyResources
} from '../resources';

@Pipe({
  name: 'skyFileSize'
})
export class SkyFileSizePipe implements PipeTransform {

  public constructor(private decimalPipe: DecimalPipe) {}

  public transform(input: number): string {

    let decimalPlaces = 0,
                dividend = 1,
                formattedSize: string,
                roundedSize: number,
                template: string;

    /* tslint:disable */
    if (input === null || input === undefined) {
        return '';
    }
    /* tslint:enable */

    if (Math.abs(input) === 1) {
      template = SkyResources.getString('file_size_b_singular');
    } else if (input < 1000) {
      template = SkyResources.getString('file_size_b_plural');
    } else if (input < 1e6) {
      template = SkyResources.getString('file_size_kb');
      dividend = 1000;
    } else if (input < 1e9) {
      template = SkyResources.getString('file_size_mb');
      dividend = 1e6;
      decimalPlaces = 1;
    } else {
      template = SkyResources.getString('file_size_gb');
      dividend = 1e9;
      decimalPlaces = 1;
    }

    roundedSize =
      Math.floor(input / (dividend / Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces);

    formattedSize = this.decimalPipe.transform(roundedSize, '.0-3');

    return SkyFormat.formatText(template, formattedSize);
  }
}
