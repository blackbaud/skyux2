import { LinkRecordsMatchModel } from './state/matches/match.model';

export class LinkRecordsItemModel {
  public key: string;
  public status: string;
  public item: any;
  public match: LinkRecordsMatchModel = new LinkRecordsMatchModel();
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
