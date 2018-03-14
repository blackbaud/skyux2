import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkyPopoverComponent
} from '../../modules/popover';

@Component({
  selector: 'sky-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss']
})
export class SkyPopoverDemoComponent {
  public asyncPopoverRef: SkyPopoverComponent;

  @ViewChild('remote')
  public remote: ElementRef;

  @ViewChild('asyncPopover')
  public asyncPopover: SkyPopoverComponent;

  constructor() {
    setTimeout(() => {
      this.asyncPopoverRef = this.asyncPopover;
    }, 1000);
  }

  public onPopoverOpened(popoverComponent: any) {
    alert('The popover was opened: ' + popoverComponent.popoverTitle);
  }

  public onPopoverClosed(popoverComponent: any) {
    alert('The popover was closed: ' + popoverComponent.popoverTitle);
  }
}
