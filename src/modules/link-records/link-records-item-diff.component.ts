import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { LinkRecordsState, LinkRecordsStateDispatcher } from './state';
import { LinkRecordsFieldsSetFieldsAction } from './state/fields/actions';
import { LinkRecordsSelectedSetSelectedAction } from './state/selected/actions';
import { LinkRecordsFieldModel } from './state/fields/field.model';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { LinkRecordsMatchesSetStatusAction } from './state/matches/actions';
import { STATUSES } from './link-records-statuses';

@Component({
  selector: 'sky-link-records-item-diff',
  templateUrl: './link-records-item-diff.component.html',
  styleUrls: ['./link-records-item-diff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLinkRecordsItemDiffComponent implements OnInit {
  public STATUSES = STATUSES;
  @Input() public readOnly: boolean = false;
  @Input() public key: string;
  @Input() public item: any;
  @Input() public match: LinkRecordsMatchModel;
  @Input() public fields: Array<any>;
  @Input() public selectedByDefault: boolean;
  @Input() public showNewFieldValues: boolean;

  /* istanbul ignore next */
  constructor(
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
  ) { }

  public ngOnInit() {
    if (this.key === undefined) {
      throw new Error("'key' is required.");
    }

    let matchFields = Object.keys(this.match.item)
      .filter(id => this.item.hasOwnProperty(id)
        && this.match.item.hasOwnProperty(id)
        && this.fields.findIndex(f => f.key === id) > -1
        && (this.item[id] && this.item[id].toString().trim().length > 0)
        && this.item[id] !== this.match.item[id])
      .map(id => {
        let field = this.fields.find(f => f.key === id);
        return new LinkRecordsFieldModel({
          key: id,
          label: field && field.label && field.label.trim().length > 0 ? field.label : id,
          currentValue: this.match.item[id],
          newValue: this.item[id]
        });
      });

    this.dispatcher.next(new LinkRecordsFieldsSetFieldsAction(this.key, matchFields));

    if (matchFields.length === 0) {
      this.dispatcher.next(
        new LinkRecordsMatchesSetStatusAction(this.key, STATUSES.Linked)
      );
    } else {
      this.state.map((s: any) => s.selected.item)
        .filter((s: any) => this.selectedByDefault !== undefined)
        .take(1)
        .subscribe((selected: any) => {
          matchFields.forEach(matchField => {
            if (selected[this.key] && selected[this.key].hasOwnProperty(matchField.key)) {
              return;
            }

            if (typeof this.selectedByDefault === 'string') {
              this.selectedByDefault = String(this.selectedByDefault) === 'true';
            }

            this.dispatcher.next(new LinkRecordsSelectedSetSelectedAction(
              this.key,
              matchField.key,
              this.selectedByDefault
            ));
          });

          if (!this.showNewFieldValues && matchFields.every(match =>
            !match.currentValue && match.newValue && match.newValue.length > 0)
          ) {
            this.dispatcher.next(
              new LinkRecordsMatchesSetStatusAction(this.key, STATUSES.Linked)
            );
          }
        });
    }
  }

  public setFieldSelected(fieldKey: string, ev: any) {
    this.dispatcher.next(
      new LinkRecordsSelectedSetSelectedAction(this.key, fieldKey, ev.checked));
  }

  public trackByFieldKey(index: number, field: LinkRecordsFieldModel) {
    return field.key;
  }

  get fieldValues() {
    return Observable.combineLatest(
      this.state.map((s: any) => s.fields.item[this.key] || []).distinctUntilChanged(),
      this.state.map((s: any) => s.selected.item[this.key] || {}).distinctUntilChanged(),
      (fields: LinkRecordsFieldModel[], selected: { [key: string]: boolean }) => {
        return fields.map(f => {
          let checkCurrentValue: boolean = this.showNewFieldValues ? true : f.currentValue;

          return {
            field: checkCurrentValue && f.newValue &&
              f.newValue.toString().trim().length > 0 ? f : undefined,
            selected: selected[f.key] || false
          };
        });
      });
  }
}
