import { SkyGridColumnModel } from '../../../grid';

export class ListViewGridColumnsLoadAction {
  constructor(
    public columns: Array<SkyGridColumnModel>,
    public refresh: boolean = false
  ) {
  }
}
