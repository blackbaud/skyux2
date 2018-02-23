import { SkySelectFieldOutput, SkySelectFieldListItems } from './select-field.interface';
export class SkySelectFieldContext {
  public pickerHeader: string;
  public pickerList: SkySelectFieldOutput;
  public selectField: SkySelectFieldListItems[];
  public selectFieldStyle: string;
}
