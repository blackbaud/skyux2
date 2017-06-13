// spell-checker:ignore Colorpicker
import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[skyColorpickerText]'
})

export class SkyColorpickerTextDirective {
  @Output('newValue')
  public newValue = new EventEmitter<any>();
  @Input('skyColorpickerText')
  public skyColorpickerText: any;
  @Input('rg')
  public rg: number;

  @HostListener('input', ['$event'])
  public changeInput(value: string) {
    if (this.rg === undefined) {
      this.newValue.emit(value);
    } else {
      let numeric = parseFloat(value);
      if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
        this.newValue.emit({ value: numeric, rg: this.rg });
      }
    }
  }
}
