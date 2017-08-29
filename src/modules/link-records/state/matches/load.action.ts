import { LinkRecordsMatchModel } from './match.model';

export class LinkRecordsMatchesLoadAction {
  constructor(
    public matches: Array<LinkRecordsMatchModel>,
    public refresh: boolean = false
  ) {
  }
}
