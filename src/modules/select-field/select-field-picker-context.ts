import { Observable } from 'rxjs/Observable';

import { SkySelectFieldSelectMode } from './types';

export class SkySelectFieldPickerContext {
  public data: Observable<any[]>;
  public headingText: string;
  public selectedValue: any;
  public selectMode: SkySelectFieldSelectMode;
}
