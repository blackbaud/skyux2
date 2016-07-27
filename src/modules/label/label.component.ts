import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-label',
  template: require('./label.component.html'),
  styles: [require('./label.component.scss')]
})
export class SkyLabelComponent {
  @Input()
  public labelType = 'info';
}
