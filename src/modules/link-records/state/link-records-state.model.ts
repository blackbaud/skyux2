import { AsyncList, AsyncItem } from 'microedge-rxstate/dist';
import { LinkRecordsMatchModel } from './matches/match.model';
import { LinkRecordsFieldModel } from './fields/field.model';
import { LinkRecordsResultModel } from './results/result.model';

export class LinkRecordsStateModel {
  public matches: AsyncList<LinkRecordsMatchModel> =
    new AsyncList<LinkRecordsMatchModel>();
  public fields: AsyncItem<{[key: string]: Array<LinkRecordsFieldModel>}> =
    new AsyncItem<{[key: string]: Array<LinkRecordsFieldModel>}>({});
  public results: AsyncList<LinkRecordsResultModel> =
    new AsyncList<LinkRecordsResultModel>();
  public selected: AsyncItem<{[key: string]: {[keyField: string]: boolean}}> =
    new AsyncItem<{[key: string]: {[keyField: string]: boolean}}>({});
}
