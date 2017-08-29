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
  LinkRecordsState,
  LinkRecordsStateDispatcher,
  LinkRecordsStateModel
} from './state';
import { LinkRecordsMatchesLoadAction } from './state/matches/actions';
import { LinkRecordsResultsLoadAction } from './state/results/actions';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { LinkRecordsFieldModel } from './state/fields/field.model';
import { LinkRecordsResultModel } from './state/results/result.model';
import { LinkRecordsItemModel } from './link-records-item.model';
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
import { STATUSES } from './link-records-statuses';
import { LinkRecordsApi } from './link-records-api';

@Component({
    selector: 'sky-link-records',
    templateUrl: './link-records.component.html',
    styleUrls: ['./link-records.component.scss'],
    providers: [
      LinkRecordsState,
      LinkRecordsStateDispatcher,
      LinkRecordsStateModel,
      LinkRecordsApi
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLinkRecordsComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() public items: Observable<Array<any>> = Observable.of([]);
  @Input() public matches: Observable<Array<LinkRecordsMatchModel>> = Observable.of([]);
  @Input() public matchFields: Observable<Array<any>> = Observable.of([]);
  @Input() public itemTemplate: TemplateRef<any>;
  @Input() public matchTemplate: TemplateRef<any>;
  @Input() public noMatchTemplate: TemplateRef<any>;
  @Input() public itemTitleTemplate: TemplateRef<any>;
  @Input() public keyIdSelector: string = 'id';
  @Input() public selectedByDefault: boolean = true;
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
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
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
      this.dispatcher.next(new LinkRecordsMatchesLoadAction(matches, true));
    });

    this.matchFields.distinctUntilChanged().subscribe(fields => {
      if (fields.findIndex(f => f.key === this.keyIdSelector) > -1) {
        throw new Error("'keyIdSelector' cannot be a match field.");
      }
    });

    let sub = Observable.combineLatest(
      this.state.map(s => s.matches.items).distinctUntilChanged(),
      this.state.map(s => s.fields.item).distinctUntilChanged(),
      this.state.map(s => s.selected.item).distinctUntilChanged(),
      (matches: Array<LinkRecordsMatchModel>,
      fields: {[key: string]: Array<LinkRecordsFieldModel>},
      selected: {[key: string]: {[key: string]: boolean}}) => {
        let newResultItems = matches.map(match => {
          let newItem = new LinkRecordsResultModel(match);

          if (newItem.status === STATUSES.Linked) {
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

        this.dispatcher.next(new LinkRecordsResultsLoadAction(newResultItems, true));
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

  public trackByRecordKey(index: number, item: LinkRecordsItemModel): string {
    return item.key;
  }

  get records() {
    return Observable.combineLatest(
      this.items.distinctUntilChanged(),
      this.state.map(s => s.matches.items).distinctUntilChanged(),
      this.matchFields.distinctUntilChanged(),
      (items: Array<any>, matches: Array<LinkRecordsMatchModel>, fields: Array<string>) => {
        return items.map(item => {
          let itemMatches = matches.filter(match => match.key === item[this.keyIdSelector]);
          let match = (itemMatches.length > 0) ? itemMatches[0] : new LinkRecordsMatchModel();

          return new LinkRecordsItemModel({
            key: item[this.keyIdSelector],
            status: (match.status) ? match.status : STATUSES.NoMatch,
            item: item,
            match: (match.status !== STATUSES.NoMatch) ? match : undefined,
            matchFields: fields
          });
        });
    });
  }

  get results() {
    return this.state.map(s => s.results.items).distinctUntilChanged();
  }

  get recordMatches() {
    return this.state.map(s => s.matches.items).distinctUntilChanged();
  }
}
