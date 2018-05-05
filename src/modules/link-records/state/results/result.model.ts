export class SkyLinkRecordsResultModel {
  public key: string;
  public status: string;
  public item: any;

  constructor(data?: any) {
    if (data) {
      this.key = data.key;
      this.status = data.status;
      this.item = data.item;
    }
  }
}
