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
  public hasBlockingWait: boolean;

  @Input()
  public hasNonBlockingWait: boolean;
}
