import {
  Component,
  ElementRef,
  ViewChild,
  AfterContentInit,
  Input
} from '@angular/core';

import { SkyResourcesService } from './../resources/resources.service';
import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-vertical-tabset',
  templateUrl: './vertical-tabset.component.html',
  styleUrls: ['./vertical-tabset.component.scss'],
  providers: [SkyVerticalTabsetService, SkyResourcesService]
})
export class SkyVerticalTabsetComponent implements AfterContentInit {

  @ViewChild('contentWrapper')
  public tabGroups: ElementRef;

  @ViewChild('skySideContent')
  public content: ElementRef;

  @Input()
  public showTabsText: string = this.resources.getString('vertical_tabs_show_tabs_text');

  constructor(
    private tabService: SkyVerticalTabsetService,
    private resources: SkyResourcesService) {}

  public ngAfterContentInit() {
    // move content from sub tabs to the right
    if (this.tabService.tabs) {
      this.tabService.tabs.forEach(tab => {
        this.content.nativeElement.appendChild(tab.tabContent.nativeElement);
      });
    }
  }
}
