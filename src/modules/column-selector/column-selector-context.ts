export class SkyColumnSelectorContext {
  public columns: Array<SkyColumnSelectorModel>;
  public selectedColumnIds: Array<string>;
}

export class SkyColumnSelectorModel {
  public id: string;
  public heading: string;
  public description: string;
}
