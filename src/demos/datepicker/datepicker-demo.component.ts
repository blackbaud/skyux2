import { Component } from '@angular/core';

@Component({
  selector: 'sky-datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class SkyDatepickerDemoComponent {
  public minDate: Date;
  public maxDate: Date;
  public selectedDate = new Date(1, 2, 3, 4, 5, 6, 7);

  public clearSelectedDate() {
    this.selectedDate = undefined;
  }
}
