import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-wait-page',
  template: require('./wait-page.component.html')
})
export class SkyWaitPageComponent {

  @Input()
  public isWaiting: boolean;
}
