import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SkyUIConfigService {

  public getConfig(key: string, defaultConfig?: any): any {
    return Observable.of(defaultConfig);
  }

  public setConfig(key: string, value: any) {
  }

}
