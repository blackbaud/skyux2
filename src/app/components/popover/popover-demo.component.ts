import { Component } from '@angular/core';

@Component({
  selector: 'sky-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss']
})
export class SkyPopoverDemoComponent {
  public onPopoverOpened(popoverComponent: any): void {
    alert('The popover was opened: ' + popoverComponent.popoverTitle);
  }

  public onPopoverClosed(popoverComponent: any): void {
    alert('The popover was closed: ' + popoverComponent.popoverTitle);
  }
}
