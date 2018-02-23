import { SkySelectFieldOutput, SkySelectFieldListItems } from './select-field.interface';
export class SkySelectFieldContext {
  public selectFieldStyle: string = 'multiple';
  public selectFieldText: string;
  public selectFieldIcon: string = 'fa-sort';
  public selectFieldClick?: Function;
  public selectFieldInitialItemsSelected: SkySelectFieldListItems[] = [];
  public skipWhileTabbing: boolean = false;
  public clearButton: boolean = false;
  public pickerList: SkySelectFieldOutput = [];
  public pickerTemplate: any;
  public pickerHeader: string;
  public selectFieldClear: boolean = false;
}
