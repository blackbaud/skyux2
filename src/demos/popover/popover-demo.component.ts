import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyPopoverMessage,
  SkyPopoverMessageType
} from '../../core';

@Component({
  selector: 'sky-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss']
})
export class SkyPopoverDemoComponent {
  @ViewChild('remote')
  public remote: ElementRef;
  public popoverMessages = new Subject<SkyPopoverMessage>();

  public onPopoverOpened(popoverComponent: any) {
    alert('The popover was opened: ' + popoverComponent.popoverTitle);
  }

  public onPopoverClosed(popoverComponent: any) {
    alert('The popover was closed: ' + popoverComponent.popoverTitle);
  }

  public openPopover() {
    this.popoverMessages.next({
      type: SkyPopoverMessageType.Open,
      elementRef: this.remote,
      alignment: 'left',
      placement: 'above'
    });
  }

  public closePopover() {
    this.popoverMessages.next({
      type: SkyPopoverMessageType.Close
    });
  }
}
