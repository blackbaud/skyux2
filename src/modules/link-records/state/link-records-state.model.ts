import { AsyncList, AsyncItem } from 'microedge-rxstate/dist';
import { SkyLinkRecordsMatchModel } from './matches/match.model';
import { SkyLinkRecordsFieldModel } from './fields/field.model';
import { SkyLinkRecordsResultModel } from './results/result.model';

export class SkyLinkRecordsStateModel {
  public matches: AsyncList<SkyLinkRecordsMatchModel> =
    new AsyncList<SkyLinkRecordsMatchModel>();
  public fields: AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}> =
    new AsyncItem<{[key: string]: Array<SkyLinkRecordsFieldModel>}>({});
  public results: AsyncList<SkyLinkRecordsResultModel> =
    new AsyncList<SkyLinkRecordsResultModel>();
  public selected: AsyncItem<{[key: string]: {[keyField: string]: boolean}}> =
    new AsyncItem<{[key: string]: {[keyField: string]: boolean}}>({});
}
