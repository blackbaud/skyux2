import { ListViewGridColumnModel } from './column.model';

export class ListViewGridColumnsLoadAction {
  constructor(
    public columns: Array<ListViewGridColumnModel>,
    public refresh: boolean = false
  ) {
  }
}
