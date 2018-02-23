import { SkySelectFieldOutput, SkySelectFieldListItems } from './select-field.interface';
export class SkySelectFieldContext {
  public selectFieldStyle: string = 'multiple';
  public selectFieldText: string;
  public selectFieldIcon: string = 'fa-search';
  public selectFieldClick?: Function;
  public initialSelectedItems: SkySelectFieldListItems[] = [];
  public skipWhileTabbing: boolean = false;
  public clearButton: boolean = false;
  public pickerContent: SkySelectFieldOutput = [];
  public pickerTemplate: any;
  public pickerHeader: string;
}
