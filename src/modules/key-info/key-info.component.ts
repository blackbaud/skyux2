import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-key-info',
  template: require('./key-info.component.html'),
  styles: [require('./key-info.component.scss')]
})
export class SkyKeyInfoComponent {
  @Input()
  public layout = 'vertical';
}
