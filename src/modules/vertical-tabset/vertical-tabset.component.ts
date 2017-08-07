import {
  Component,
  ElementRef,
  ViewChild,
  AfterContentInit,
  Input
} from '@angular/core';

import { SkyResourcesService } from './../resources/resources.service';
import { SkyVerticalTabsetService } from './vertical-tabset.service';
import { SkyMediaQueryService } from './../media-queries/media-query.service';
import { SkyMediaBreakpoints } from 'src/modules/media-queries';

@Component({
  selector: 'sky-vertical-tabset',
  templateUrl: './vertical-tabset.component.html',
  styleUrls: ['./vertical-tabset.component.scss'],
  providers: [SkyVerticalTabsetService, SkyResourcesService, SkyMediaQueryService]
})
export class SkyVerticalTabsetComponent implements AfterContentInit {

  @ViewChild('contentWrapper')
  public tabGroups: ElementRef;

  @ViewChild('skySideContent')
  public content: ElementRef;

  @Input()
  public showTabsText: string = this.resources.getString('vertical_tabs_show_tabs_text');

  private _tabsVisible: boolean;

  constructor(
    private tabService: SkyVerticalTabsetService,
    private resources: SkyResourcesService,
    private mediaQueryService: SkyMediaQueryService) {}

  public ngAfterContentInit() {
    // move content from sub tabs to the right
    if (this.tabService.tabs) {
      this.tabService.tabs.forEach(tab => {
        this.content.nativeElement.appendChild(tab.tabContent.nativeElement);
      });
    }

    this.tabService.tabClicked.subscribe((clicked: boolean) => {
      if (this.isMobile()) {
        this._tabsVisible = false;
      }
    });
  }

  public tabsVisible(): boolean {
    return !this.isMobile() || this._tabsVisible;
  }

  public contentVisible(): boolean {
    return !this.isMobile() || !this._tabsVisible;
  }

  public isMobile(): boolean {
    return this.mediaQueryService.current === SkyMediaBreakpoints.xs;
  }

  public showTabs() {
    this._tabsVisible = true;
  }
}
