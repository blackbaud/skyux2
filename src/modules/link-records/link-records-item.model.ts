import { SkyLinkRecordsMatchModel } from './state/matches/match.model';

export class SkyLinkRecordsItemModel {
  public key: string;
  public status: string;
  public item: any;
  public match: SkyLinkRecordsMatchModel = new SkyLinkRecordsMatchModel();
  public matchFields: Array<any> = [];

  constructor(data: any = undefined) {
    /* istanbul ignore else */
    if (data !== undefined) {
      this.key = data.key;
      this.status = data.status;
      this.item = data.item;
      this.match = data.match;
      this.matchFields = data.matchFields || [];
    }
  }
}
