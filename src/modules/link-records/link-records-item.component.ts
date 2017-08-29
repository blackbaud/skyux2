import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  QueryList,
  ViewChildren,
  AfterContentInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LinkRecordsState, LinkRecordsStateDispatcher } from './state';
import {
  LinkRecordsMatchesSetStatusAction,
  LinkRecordsMatchesSetItemAction
} from './state/matches/actions';
import { LinkRecordsFieldsClearFieldsAction } from './state/fields/actions';
import { LinkRecordsSelectedClearSelectedAction } from './state/selected/actions';
import { STATUSES } from './link-records-statuses';
import { LinkRecordsItemModel } from './link-records-item.model';
import {
  SkyLinkRecordsItemDiffComponent
} from './link-records-item-diff.component';

@Component({
    selector: 'sky-link-records-item',
    templateUrl: './link-records-item.component.html',
    styleUrls: ['./link-records-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLinkRecordsItemComponent implements AfterContentInit {
  public STATUSES = STATUSES;
  @Input() public record: LinkRecordsItemModel;
  @Input() public itemTemplate: TemplateRef<any>;
  @Input() public matchTemplate: TemplateRef<any>;
  @Input() public noMatchTemplate: TemplateRef<any>;
  @Input() public itemTitleTemplate: TemplateRef<any>;
  @Input() public selectedByDefault: boolean;
  @ViewChildren(SkyLinkRecordsItemDiffComponent)
    public viewItems: QueryList<SkyLinkRecordsItemDiffComponent>;

  /* istanbul ignore next */
  constructor(
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
  ) {}

  public ngAfterContentInit() {
    if (this.record.status === STATUSES.Edit &&
      (!this.record.matchFields || this.record.matchFields.length === 0)) {
      this.link();
    }
  }

  get updatedFieldsTotal(): Observable<number> {
    return this.state
      .map(s => s.selected.item[this.record.key] || {})
      .map(fields => Object.keys(fields).filter(k => fields[k]).length)
      .distinctUntilChanged();
  }

  public link() {
    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, STATUSES.Linked));
  }

  public unlink() {
    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, STATUSES.NoMatch));
    this.dispatcher.next(new LinkRecordsMatchesSetItemAction(this.record.key, undefined));
    this.dispatcher.next(new LinkRecordsSelectedClearSelectedAction(this.record.key));
    this.dispatcher.next(new LinkRecordsFieldsClearFieldsAction(this.record.key));
  }

  public create() {
    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, STATUSES.Created));
    this.dispatcher.next(new LinkRecordsMatchesSetItemAction(this.record.key, this.record.item));
  }

  public edit() {
    let status = (this.record.matchFields && this.record.matchFields.length > 0) ?
      STATUSES.Edit : STATUSES.Linked;

    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, status));
  }

  public cancelEdit() {
    this.dispatcher.next(
      new LinkRecordsMatchesSetStatusAction(this.record.key, STATUSES.Suggested));
    this.dispatcher.next(new LinkRecordsSelectedClearSelectedAction(this.record.key));
    this.dispatcher.next(new LinkRecordsFieldsClearFieldsAction(this.record.key));
  }
}
