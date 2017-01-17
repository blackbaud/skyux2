import { ListViewGridColumnModel } from '../columns/column.model';

export class ListViewDisplayedGridColumnsLoadAction {
  constructor(
    public columns: Array<ListViewGridColumnModel>,
    public refresh: boolean = false
  ) {
  }
}
