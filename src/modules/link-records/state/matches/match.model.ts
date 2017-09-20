export class SkyLinkRecordsMatchModel {
  public key: string;
  public status: string;
  public item: any;

  constructor(data: any = undefined) {
    if (data) {
      this.key = data.key;
      this.status = data.status;
      this.item = data.item;
    }
  }
}
