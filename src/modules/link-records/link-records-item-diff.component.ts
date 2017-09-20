import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { SkyLinkRecordsState, SkyLinkRecordsStateDispatcher } from './state';
import { SkyLinkRecordsFieldsSetFieldsAction } from './state/fields/actions';
import { SkyLinkRecordsSelectedSetSelectedAction } from './state/selected/actions';
import { SkyLinkRecordsFieldModel } from './state/fields/field.model';
import { SkyLinkRecordsMatchModel } from './state/matches/match.model';
import { SkyLinkRecordsMatchesSetStatusAction } from './state/matches/actions';
import { SKY_LINK_RECORDS_STATUSES } from './link-records-statuses';

@Component({
  selector: 'sky-link-records-item-diff',
  templateUrl: './link-records-item-diff.component.html',
  styleUrls: ['./link-records-item-diff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLinkRecordsItemDiffComponent implements OnInit {
  public STATUSES = SKY_LINK_RECORDS_STATUSES;
  @Input() public readOnly: boolean = false;
  @Input() public key: string;
  @Input() public item: any;
  @Input() public match: SkyLinkRecordsMatchModel;
  @Input() public fields: Array<any>;
  @Input() public selectedByDefault: boolean;
  @Input() public showNewFieldValues: boolean;

  /* istanbul ignore next */
  constructor(
    private state: SkyLinkRecordsState,
    private dispatcher: SkyLinkRecordsStateDispatcher
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
        return new SkyLinkRecordsFieldModel({
          key: id,
          label: field && field.label && field.label.trim().length > 0 ? field.label : id,
          currentValue: this.match.item[id],
          newValue: this.item[id]
        });
      });

    this.dispatcher.next(new SkyLinkRecordsFieldsSetFieldsAction(this.key, matchFields));

    if (matchFields.length === 0) {
      this.dispatcher.next(
        new SkyLinkRecordsMatchesSetStatusAction(this.key, this.STATUSES.Linked)
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

            this.dispatcher.next(new SkyLinkRecordsSelectedSetSelectedAction(
              this.key,
              matchField.key,
              this.selectedByDefault
            ));
          });

          if (!this.showNewFieldValues && matchFields.every(match =>
            !match.currentValue && match.newValue && match.newValue.length > 0)
          ) {
            this.dispatcher.next(
              new SkyLinkRecordsMatchesSetStatusAction(this.key, this.STATUSES.Linked)
            );
          }
        });
    }
  }

  public setFieldSelected(fieldKey: string, ev: any) {
    this.dispatcher.next(
      new SkyLinkRecordsSelectedSetSelectedAction(this.key, fieldKey, ev.checked));
  }

  public trackByFieldKey(index: number, field: SkyLinkRecordsFieldModel) {
    return field.key;
  }

  get fieldValues() {
    return Observable.combineLatest(
      this.state.map((s: any) => s.fields.item[this.key] || []).distinctUntilChanged(),
      this.state.map((s: any) => s.selected.item[this.key] || {}).distinctUntilChanged(),
      (fields: SkyLinkRecordsFieldModel[], selected: { [key: string]: boolean }) => {
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
