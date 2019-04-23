import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkyPopoverComponent,
  SkyPopoverMessageType,
  SkyPopoverMessage
} from '@skyux/popovers';

import { Subject } from 'rxjs';

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

  public popoverController = new Subject<SkyPopoverMessage>();

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

  public openPopover() {
    this.sendMessage(SkyPopoverMessageType.Open);
  }

  public closePopover() {
    this.sendMessage(SkyPopoverMessageType.Close);
  }

  private sendMessage(type: SkyPopoverMessageType) {
    const message: SkyPopoverMessage = { type };
    this.popoverController.next(message);
  }
}
