export class SkyLinkRecordsFieldModel {
  public key: string;
  public label: string;
  public currentValue: any;
  public newValue: any;

  constructor(data: any) {
    if (data) {
      this.key = data.key;
      this.label = data.label;
      this.currentValue = data.currentValue;
      this.newValue = data.newValue;
    }
  }
}
