import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'sky-radio-label',
  templateUrl: '../shared/simple-content.html'
})
export class SkyRadioLabelComponent {
  // When clicking on a checkbox label, angular registers two click events.
  // This handler ignores all events except for those that deal with the checkbox input explicitly.
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
