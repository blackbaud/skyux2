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

  public attachAsyncPopover(): void {
    this.asyncPopoverRef = this.asyncPopover;
  }

  public attachAnotherAsyncPopover(): void {
    this.asyncPopoverRef = this.anotherAsyncPopover;
  }
}
