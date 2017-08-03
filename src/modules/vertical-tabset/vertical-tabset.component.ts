import {
  Component,
  ElementRef,
  ViewChild,
  AfterContentInit
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

  constructor(private tabService: SkyVerticalTabsetService) {}

  public ngAfterContentInit() {
    // move content from sub tabs to the right
    if (this.tabService.tabs) {
      this.tabService.tabs.forEach(tab => {
        this.content.nativeElement.appendChild(tab.tabContent.nativeElement);
      });
    }
  }
}
