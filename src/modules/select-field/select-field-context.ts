import { SkySelectFieldOutput, SkySelectFieldListItems } from './select-field.interface';
export class SkySelectFieldContext {
  public selectFieldStyle: string;
  public selectFieldText: string;
  public selectFieldIcon: string;
  public selectFieldClick?: Function;
  public selectField: SkySelectFieldListItems[];
  public skipWhileTabbing: boolean = false;
  public clearButton: boolean = false;
  public pickerList: SkySelectFieldOutput;
  public pickerTemplate: any;
  public pickerHeader: string;
  public selectFieldClear: boolean = false;
}
