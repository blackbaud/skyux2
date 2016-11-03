import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-navbar-item',
  template: require('./navbar-item.component.html'),
  styles: [require('./navbar-item.component.scss')]
})
export class SkyNavbarItemComponent {
  @Input()
  public active: boolean;
}
