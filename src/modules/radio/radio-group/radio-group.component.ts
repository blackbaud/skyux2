import { Component, OnDestroy, ViewChildren, OnInit } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { SKY_RADIO_CONTROL_VALUE_ACCESSOR } from "../radio.component";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'sky-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [SKY_RADIO_CONTROL_VALUE_ACCESSOR]
})
export class SkyRadioComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private _selectedValue = new BehaviorSubject<any>(undefined);
  private destroyed = new Subject();

  @ViewChildren('sky-radio') private radioButtons: SkyRadioComponent[];

  public ngOnInit() {
  }

  public writeValue(value: any) {
    if (value === undefined) {
      return;
    }
    this._selectedValue.next(value);
  }

  public registerOnChange(fn: Function) {
    this._selectedValue.takeUntil(this.destroyed).subscribe((value) => { fn(value); });
  }

  public registerOnTouched(fn: Function) {
  }

  public ngOnDestroy() {
    this.destroyed.next();
  }
}
