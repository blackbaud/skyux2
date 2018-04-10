import { Observable } from 'rxjs/Observable';

export class SkySelectFieldPickerContext {
  public data: Observable<any[]>;
  public headingText: string;
  public selectedItems: any[];
}
