import { LinkRecordsResultModel } from './result.model';

export class LinkRecordsResultsLoadAction {
  constructor(
    public results: Array<LinkRecordsResultModel>,
    public refresh: boolean = false
  ) {
  }
}
