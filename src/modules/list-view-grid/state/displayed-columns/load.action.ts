import { SkyGridColumnModel } from '../../../grid';

export class ListViewDisplayedGridColumnsLoadAction {
  constructor(
    public columns: Array<SkyGridColumnModel>,
    public refresh: boolean = false
  ) {
  }
}
