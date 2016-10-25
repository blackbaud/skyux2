import { ListPagingConfigModel } from './config/config.model';
import { ListPagingCurrentModel } from './current/current.model';

export class PagingStateModel {
  public config: ListPagingConfigModel = new ListPagingConfigModel();
  public current: ListPagingCurrentModel = new ListPagingCurrentModel();
}
