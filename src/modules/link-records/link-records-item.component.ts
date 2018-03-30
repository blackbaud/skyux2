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
import 'rxjs/add/operator/distinctUntilChanged';

import { SkyLinkRecordsState, SkyLinkRecordsStateDispatcher } from './state';
import {
  SkyLinkRecordsMatchesSetStatusAction,
  SkyLinkRecordsMatchesSetItemAction

} from './state/matches/actions';
import {
  SkyLinkRecordsFieldsClearFieldsAction,
  SkyLinkRecordsFieldsSetFieldsAction
} from './state/fields/actions';
import {
  SkyLinkRecordsSelectedClearSelectedAction,
  SkyLinkRecordsSelectedSetSelectedAction
} from './state/selected/actions';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';
import { SkyLinkRecordsItemModel } from './link-records-item.model';
import {
  SkyLinkRecordsItemDiffComponent
} from './link-records-item-diff.component';
import { SkyLinkRecordsFieldModel } from './state/fields/field.model';

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
    let filteredMatchFields: Array<any> = [];

    if (this.record.match.item) {
      // filter possible match fields to show fields between item and item match with different values
      filteredMatchFields = Object.keys(this.record.match.item)
        .filter(id => this.record.item.hasOwnProperty(id)
          && this.record.match.item.hasOwnProperty(id)
          && this.record.matchFields.findIndex(f => f.key === id) > -1
          && (this.record.item[id] && this.record.item[id].toString().trim().length > 0)
          && this.record.item[id] !== this.record.match.item[id]).map(id => {
          let field = this.record.matchFields.find(f => f.key === id);
          return new SkyLinkRecordsFieldModel({
            key: id,
            label: field && field.label && field.label.trim().length > 0 ? field.label : id,
            currentValue: this.record.match.item[id],
            newValue: this.record.item[id]
          });
        });
    }

    if (filteredMatchFields.length === 0) { // if all fields match, link
      this.dispatcher.next(new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.Linked));
    } else if (!this.showNewFieldValues && filteredMatchFields.every(match =>
          !match.currentValue && match.newValue && match.newValue.length > 0)
    ) { // if we are not showing new values, and all values are new, link
      this.dispatcher.next(
        new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.Linked)
      );
    } else { // else the status is an edit
      this.dispatcher.next(
        new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.Edit)
      );
    }

    this.dispatcher.next(new SkyLinkRecordsFieldsSetFieldsAction(this.record.key, filteredMatchFields));

    if (filteredMatchFields.length > 0) {
      this.state.map((s: any) => s.selected.item)
        .filter((s: any) => this.selectedByDefault !== undefined)
        .take(1)
        .subscribe((selected: any) => {
          filteredMatchFields.forEach(matchField => {
            if (selected[this.record.key] && selected[this.record.key].hasOwnProperty(matchField.key)) {
              return;
            }

            if (typeof this.selectedByDefault === 'string') {
              this.selectedByDefault = String(this.selectedByDefault) === 'true';
            }

            this.dispatcher.next(new SkyLinkRecordsSelectedSetSelectedAction(
              this.record.key,
              matchField.key,
              this.selectedByDefault
            ));
          });
        });
    }
  }

  public cancelEdit() {
    this.dispatcher.next(
      new SkyLinkRecordsMatchesSetStatusAction(this.record.key, this.STATUSES.Suggested));
    this.dispatcher.next(new SkyLinkRecordsSelectedClearSelectedAction(this.record.key));
    this.dispatcher.next(new SkyLinkRecordsFieldsClearFieldsAction(this.record.key));
  }
}
