import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'sky-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss']
})
export class SkyPopoverDemoComponent {
  @ViewChild('remote')
  public remote: ElementRef;

  public onPopoverOpened(popoverComponent: any) {
    alert('The popover was opened: ' + popoverComponent.popoverTitle);
  }

  public onPopoverClosed(popoverComponent: any) {
    alert('The popover was closed: ' + popoverComponent.popoverTitle);
  }
}
