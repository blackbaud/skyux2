import {
  Component,
  OnInit
} from '@angular/core';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

function getWindow() {
  return window;
}

@Component({
  selector: 'sky-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss']
})
export class SkyPopoverDemoComponent implements OnInit {
  public outOfBoundsDemoUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  public ngOnInit() {
    this.outOfBoundsDemoUrl = this.sanitizer
      .bypassSecurityTrustResourceUrl(
        `${getWindow().location.href}/out-of-bounds-demo`
      );
  }

  public onPopoverOpened(popoverComponent: any): void {
    alert('The popover was opened: ' + popoverComponent.popoverTitle);
  }

  public onPopoverClosed(popoverComponent: any): void {
    alert('The popover was closed: ' + popoverComponent.popoverTitle);
  }
}
