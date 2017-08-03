import {
  Component,
  ElementRef,
  ViewChild,
  AfterContentInit,
  ViewContainerRef
} from '@angular/core';

import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tabset',
  templateUrl: './vertical-tabset.component.html',
  styleUrls: ['./vertical-tabset.component.scss'],
  providers: [SkyVerticalTabsetService]
})
export class SkyVerticalTabsetComponent implements AfterContentInit {

  @ViewChild('contentWrapper')
  public tabGroups: ElementRef;

  @ViewChild('skySideContent')
  public content: ElementRef;

  public tabContent: any;

  constructor(
    public viewContainerRef: ViewContainerRef) {}

  public ngAfterContentInit() {
    this.tabContent =
      this.tabGroups.nativeElement.querySelectorAll('.sky-vertical-tab-content');

    this.tabContent.forEach((contentEl: ElementRef) => {
      this.content.nativeElement.appendChild(contentEl);
    });
  }
}
