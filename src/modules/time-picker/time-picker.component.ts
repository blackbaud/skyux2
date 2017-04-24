import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';

/**
 * Monotonically increasing integer used to auto-generate unique ids for components.
 */
let nextId = 0;

@Component({
  selector: 'sky-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTimePickerComponent implements OnChanges {
  @Input()
  public id: string = `sky-time-picker-${++nextId}`;

  @Input()
  public tabindex: number = 0;

  @Input()
  public time: string;

  @Input()
  public disabled: boolean = false;

  @Output()
  public currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  public get inputId(): string {
    return `input-${this.id}`;
  }
  public selectedValue: any;

  public ngOnChanges(changes: SimpleChanges) {

    this.onTimePickerChanged(changes);

  }

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   */
  public onTimePickerChanged(newValue: any) {
    /* istanbul ignore else */
    /* sanity check */
    if (!this.disabled) {
      /* istanbul ignore else */
      /* sanity check */
      if (newValue !== this.selectedValue) {
        this.selectedValue = newValue;

      }
    }
  }

}
