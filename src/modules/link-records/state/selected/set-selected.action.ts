export class LinkRecordsSelectedSetSelectedAction {
  constructor(
    public key: string,
    public fieldKey: string,
    public selected: boolean
  ) {}
}
