// spell-checker:ignore Colorpicker
import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { SkyColorpickerChangeColor } from './colorpicker.interface';
@Directive({
  selector: '[skyColorpickerText]'
})

export class SkyColorpickerTextDirective {
  @Output('newColorContrast')
  public newColorContrast = new EventEmitter<SkyColorpickerChangeColor>();
  @Input('skyColorpickerText')
  public skyColorpickerText: any;
  @Input('color')
  public color: string;
  @Input('maxRange')
  public maxRange: number;

  @HostListener('input', ['$event'])
  public changeInput(event: Event) {
    let element: HTMLInputElement = <HTMLInputElement>event.target;
    let elementValue = parseFloat(element.value);
    if (!isNaN(elementValue) && elementValue >= 0 && elementValue <= this.maxRange) {
      this.newColorContrast.emit(
        {
          color: this.color,
          colorValue: elementValue,
          maxRange: this.maxRange
        }
      );
    }
  }
}
