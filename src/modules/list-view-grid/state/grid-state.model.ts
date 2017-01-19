import { AsyncList } from 'microedge-rxstate/dist';
import { SkyGridColumnModel } from '../../grid';

export class GridStateModel {
  public columns: AsyncList<SkyGridColumnModel> = new AsyncList<SkyGridColumnModel>();
  public displayedColumns: AsyncList<SkyGridColumnModel> =
    new AsyncList<SkyGridColumnModel>();
}
