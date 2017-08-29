import { LinkRecordsFieldModel } from './field.model';

export class LinkRecordsFieldsSetFieldsAction {
  constructor(
    public key: string,
    public fields: Array<LinkRecordsFieldModel>
  ) {
  }
}
