import {Pipe, PipeTransform} from 'angular2/core';
import {SkyResources} from './resources';

@Pipe({
  name: 'skyResources'
})
export class SkyResourcesPipe implements PipeTransform {
  transform(name: string): string {
    return SkyResources.getString(name);
  }
}
