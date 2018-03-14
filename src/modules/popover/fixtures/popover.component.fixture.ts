import {
  Component,
  ViewChild
} from '@angular/core';

import { SkyPopoverComponent } from '../popover.component';

@Component({
  selector: 'sky-test-component',
  templateUrl: './popover.component.fixture.html'
})
export class SkyPopoverTestComponent {
  public asyncPopoverRef: SkyPopoverComponent;

  @ViewChild('asyncPopover')
  public asyncPopover: SkyPopoverComponent;

  @ViewChild('anotherAsyncPopover')
  public anotherAsyncPopover: SkyPopoverComponent;

  public attachAsyncPopover() {
    this.asyncPopoverRef = this.asyncPopover;
  }

  public attachAnotherAsyncPopover() {
    this.asyncPopoverRef = this.anotherAsyncPopover;
  }
}
