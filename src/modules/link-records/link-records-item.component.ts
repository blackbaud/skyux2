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
import { SkyLinkRecordsState, SkyLinkRecordsStateDispatcher } from './state';
import {
  SkyLinkRecordsMatchesSetStatusAction,
  SkyLinkRecordsMatchesSetItemAction
} from './state/matches/actions';
import { SkyLinkRecordsFieldsClearFieldsAction } from './state/fields/actions';
import { SkyLinkRecordsSelectedClearSelectedAction } from './state/selected/actions';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';
import { SkyLinkRecordsItemModel } from './link-records-item.model';
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
  public STATUSES = SKY_LINK_RECORDS_STATUSES;
  @Input() public record: SkyLinkRecordsItemModel;
  @Input() public itemTemplate: TemplateRef<any>;
  @Input() public matchTemplate: TemplateRef<any>;
  @Input() public noMatchTemplate: TemplateRef<any>;
  @Input() public itemTitleTemplate: TemplateRef<any>;
  @Input() public selectedByDefault: boolean;
  @Input() public showNewFieldValues: boolean;
  @ViewChildren(SkyLinkRecordsItemDiffComponent)
    public viewItems: QueryList<SkyLinkRecordsItemDiffComponent>;

  /* istanbul ignore next */
  constructor(
    private state: SkyLinkRecordsState,
    private dispatcher: SkyLinkRecordsStateDispatcher
  ) {}

  public ngAfterContentInit() {
    if (this.record.status === this.STATUSES.Edit &&
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
    this.dispatcher.next(
      new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.Linked)
    );
  }

  public unlink() {
    this.dispatcher.next(
      new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.NoMatch)
    );
    this.dispatcher.next(new SkyLinkRecordsMatchesSetItemAction(this.record.key, undefined));
    this.dispatcher.next(new SkyLinkRecordsSelectedClearSelectedAction(this.record.key));
    this.dispatcher.next(new SkyLinkRecordsFieldsClearFieldsAction(this.record.key));
  }

  public create() {
    this.dispatcher.next(
      new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.Created)
    );
    this.dispatcher.next(new SkyLinkRecordsMatchesSetItemAction(this.record.key, this.record.item));
  }

  public edit() {
    let status = (this.record.matchFields && this.record.matchFields.length > 0) ?
      this.STATUSES.Edit : this.STATUSES.Linked;

    this.dispatcher.next(new SkyLinkRecordsMatchesSetStatusAction(this.record.key, status));
  }

  public cancelEdit() {
    this.dispatcher.next(
      new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.Suggested));
    this.dispatcher.next(new SkyLinkRecordsSelectedClearSelectedAction(this.record.key));
    this.dispatcher.next(new SkyLinkRecordsFieldsClearFieldsAction(this.record.key));
  }
}
