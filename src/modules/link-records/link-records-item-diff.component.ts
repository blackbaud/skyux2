import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { SkyLinkRecordsState, SkyLinkRecordsStateDispatcher } from './state';
import { SkyLinkRecordsSelectedSetSelectedAction } from './state/selected/actions';
import { SkyLinkRecordsFieldModel } from './state/fields/field.model';
import { SkyLinkRecordsMatchModel } from './state/matches/match.model';
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
