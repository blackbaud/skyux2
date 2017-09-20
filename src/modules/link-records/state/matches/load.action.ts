import { SkyLinkRecordsMatchModel } from './match.model';

export class SkyLinkRecordsMatchesLoadAction {
  constructor(
    public matches: Array<SkyLinkRecordsMatchModel>,
    public refresh: boolean = false
  ) {
  }
}
