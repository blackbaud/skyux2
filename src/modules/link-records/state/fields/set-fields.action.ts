import { SkyLinkRecordsFieldModel } from './field.model';

export class SkyLinkRecordsFieldsSetFieldsAction {
  constructor(
    public key: string,
    public fields: Array<SkyLinkRecordsFieldModel>
  ) {
  }
}
