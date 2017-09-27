import { SkyLinkRecordsResultModel } from './result.model';

export class SkyLinkRecordsResultsLoadAction {
  constructor(
    public results: Array<SkyLinkRecordsResultModel>,
    public refresh: boolean = false
  ) {
  }
}
