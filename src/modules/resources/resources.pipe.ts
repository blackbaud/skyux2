import { Pipe, PipeTransform } from '@angular/core';

import { SkyResources } from './resources';

@Pipe({
  name: 'skyResources'
})
export class SkyResourcesPipe implements PipeTransform {
  public transform(name: string): string {
    return SkyResources.getString(name);
  }
}
