import {
  AfterContentInit,
  Component,
  ContentChildren,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  forwardRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  SkyLinkRecordsState,
  SkyLinkRecordsStateDispatcher,
  SkyLinkRecordsStateModel
} from './state';
import { SkyLinkRecordsMatchesLoadAction } from './state/matches/actions';
import { SkyLinkRecordsResultsLoadAction } from './state/results/actions';
import { SkyLinkRecordsMatchModel } from './state/matches/match.model';
import { SkyLinkRecordsFieldModel } from './state/fields/field.model';
import { SkyLinkRecordsResultModel } from './state/results/result.model';
import { SkyLinkRecordsItemModel } from './link-records-item.model';
import {
  SkyLinkRecordsItemTitleComponent
} from './link-records-item-title.component';
import {
  SkyLinkRecordsItemContentComponent
} from './link-records-item-content.component';
import {
  SkyLinkRecordsMatchContentComponent
} from './link-records-match-content.component';
import {
  SkyLinkRecordsNoMatchContentComponent
} from './link-records-nomatch-content.component';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';
import { SkyLinkRecordsApi } from './link-records-api';

@Component({
    selector: 'sky-link-records',
    templateUrl: './link-records.component.html',
    styleUrls: ['./link-records.component.scss'],
    providers: [
      SkyLinkRecordsState,
      SkyLinkRecordsStateDispatcher,
      SkyLinkRecordsStateModel,
      SkyLinkRecordsApi
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLinkRecordsComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() public items: Observable<Array<any>> = Observable.of([]);
  @Input() public matches: Observable<Array<SkyLinkRecordsMatchModel>> = Observable.of([]);
  @Input() public matchFields: Observable<Array<any>> = Observable.of([]);
  @Input() public itemTemplate: TemplateRef<any>;
  @Input() public matchTemplate: TemplateRef<any>;
  @Input() public noMatchTemplate: TemplateRef<any>;
  @Input() public itemTitleTemplate: TemplateRef<any>;
  @Input() public keyIdSelector: string = 'id';
  @Input() public selectedByDefault: boolean = true;
  @Input() public showNewFieldValues: boolean = true;
  /* tslint:disable */
  @ContentChildren(forwardRef(() => SkyLinkRecordsItemTitleComponent))
    public nodeItemTitle: QueryList<SkyLinkRecordsItemTitleComponent>;
  @ContentChildren(forwardRef(() => SkyLinkRecordsItemContentComponent))
    public nodeItem: QueryList<SkyLinkRecordsItemContentComponent>;
  @ContentChildren(forwardRef(() => SkyLinkRecordsMatchContentComponent))
    public nodeMatch: QueryList<SkyLinkRecordsMatchContentComponent>;
  @ContentChildren(forwardRef(() => SkyLinkRecordsNoMatchContentComponent))
    public nodeNoMatch: QueryList<SkyLinkRecordsNoMatchContentComponent>;
  private subscriptions: Array<any> = [];
  /* tslint:enable */

  /* istanbul ignore next */
  constructor(
    private state: SkyLinkRecordsState,
    private dispatcher: SkyLinkRecordsStateDispatcher
  ) {}

  public ngOnInit() {
    if (this.items && !(this.items instanceof Observable)) {
      this.items = Observable.of(this.items);
    }

    if (this.matches && !(this.matches instanceof Observable)) {
      this.matches = Observable.of(this.matches);
    }

    if (this.matchFields && !(this.matchFields instanceof Observable)) {
      this.matchFields = Observable.of(this.matchFields);
    }

    this.matches.distinctUntilChanged().subscribe(matches => {
      this.dispatcher.next(new SkyLinkRecordsMatchesLoadAction(matches, true));
    });

    this.matchFields.distinctUntilChanged().subscribe(fields => {
      if (fields.findIndex(f => f.key === this.keyIdSelector) > -1) {
        throw new Error("'keyIdSelector' cannot be a match field.");
      }
    });

    let sub = Observable.combineLatest(
      this.state.map((s: any) => s.matches.items).distinctUntilChanged(),
      this.state.map((s: any) => s.fields.item).distinctUntilChanged(),
      this.state.map((s: any) => s.selected.item).distinctUntilChanged(),
      (matches: Array<SkyLinkRecordsMatchModel>,
      fields: {[key: string]: Array<SkyLinkRecordsFieldModel>},
      selected: {[key: string]: {[key: string]: boolean}}) => {
        let newResultItems = matches.map(match => {
          let newItem = new SkyLinkRecordsResultModel(match);

          if (newItem.status === SKY_LINK_RECORDS_STATUSES.Linked) {
            newItem.item = {id: match.item.id};
            let selection = selected[match.key] || {};
            let newFields = (fields[newItem.key]) ?
              fields[newItem.key].filter(f => selection[f.key]) : [];
            newFields.forEach(f => {
              /* istanbul ignore else */
              if (selection[f.key]) {
                newItem.item[f.key] = f.newValue;
              }
            });
          } else {
            newItem.item = undefined;
          }

          return newItem;
        }).filter(f => f !== undefined);

        this.dispatcher.next(new SkyLinkRecordsResultsLoadAction(newResultItems, true));
      }).subscribe();

    this.subscriptions.push(sub);
  }

  public ngAfterContentInit() {
    if (this.nodeItemTitle.length > 0) {
      this.itemTitleTemplate = this.nodeItemTitle.first.template;
    }

    if (this.nodeItem.length > 0) {
      this.itemTemplate = this.nodeItem.first.template;
    }

    if (this.nodeMatch.length > 0) {
      this.matchTemplate = this.nodeMatch.first.template;
    }

    if (this.nodeNoMatch.length > 0) {
      this.noMatchTemplate = this.nodeNoMatch.first.template;
    }
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public trackByRecordKey(index: number, item: SkyLinkRecordsItemModel): string {
    return item.key;
  }

  get records() {
    return Observable.combineLatest(
      this.items.distinctUntilChanged(),
      this.state.map((s: any) => s.matches.items).distinctUntilChanged(),
      this.matchFields.distinctUntilChanged(),
      (items: Array<any>, matches: Array<SkyLinkRecordsMatchModel>, fields: Array<string>) => {
        return items.map(item => {
          let itemMatches = matches.filter(match => match.key === item[this.keyIdSelector]);
          let match = (itemMatches.length > 0) ? itemMatches[0] : new SkyLinkRecordsMatchModel();

          return new SkyLinkRecordsItemModel({
            key: item[this.keyIdSelector],
            status: (match.status) ? match.status : SKY_LINK_RECORDS_STATUSES.NoMatch,
            item: item,
            match: (match.status !== SKY_LINK_RECORDS_STATUSES.NoMatch) ? match : undefined,
            matchFields: fields
          });
        });
    });
  }

  get results() {
    return this.state.map((s: any) => s.results.items).distinctUntilChanged();
  }

  get recordMatches() {
    return this.state.map((s: any) => s.matches.items).distinctUntilChanged();
  }
}
