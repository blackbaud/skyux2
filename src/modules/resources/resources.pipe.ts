import {Pipe, PipeTransform} from 'angular2/core';
import {Resources} from './resources';

@Pipe({
  name: 'skyResources'
})
export class ResourcesPipe implements PipeTransform {
  public transform(name: string): string {
    return Resources.getString(name);
  }
}
