import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { SkyResourcesService } from './../resources/resources.service';
import { SkyVerticalTabsetService } from './vertical-tabset.service';
import { SkyMediaQueryService } from './../media-queries/media-query.service';
import { SkyMediaBreakpoints } from '../media-queries/media-breakpoints';

@Component({
  selector: 'sky-vertical-tabset',
  templateUrl: './vertical-tabset.component.html',
  styleUrls: ['./vertical-tabset.component.scss'],
  providers: [SkyVerticalTabsetService, SkyResourcesService, SkyMediaQueryService],
  animations: [
    trigger(
      'tabGroupEnter', [
        transition(':enter', [
          style({transform: 'translate(-100%)', opacity: 0}),
          animate('350ms', style({transform: 'translate(0)', opacity: 1}))
        ])
      ]
    ),
    trigger(
      'contentEnter', [
        transition(':enter', [
          style({transform: 'translate(100%)', opacity: 0}),
          animate('350ms', style({transform: 'translate(0)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class SkyVerticalTabsetComponent implements AfterViewInit {

  @ViewChild('contentWrapper')
  public tabGroups: ElementRef;

  @ViewChild('skySideContent')
  public content: ElementRef;

  @Input()
  public showTabsText: string = this.resources.getString('vertical_tabs_show_tabs_text');

  private _tabsVisible: boolean;
  private _wideScreen: boolean;

  constructor(
    private tabService: SkyVerticalTabsetService,
    private resources: SkyResourcesService,
    private mediaQueryService: SkyMediaQueryService,
    private changeRef: ChangeDetectorRef) {}

  public ngAfterViewInit() {
    this.tabService.tabClicked.subscribe(this.tabClicked);
  }

  public tabsVisible(): boolean {
    const isMobile = this.isMobile();

    // hide tabs when switching from widescreen to mobile
    if (!isMobile) {
      this._wideScreen = true;
    } else if (isMobile && this._wideScreen) {
      this._tabsVisible = false;
      this._wideScreen = false;
    }

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

  public tabClicked = () => {
    if (this.isMobile()) {
      this._tabsVisible = false;
      this.changeRef.detectChanges();
    }

    this.moveActiveTabContent();
  }

  public moveActiveTabContent() {
    // add active tab content to side div
    let activeContent = this.tabService.activeTabContent();
    this.content.nativeElement.appendChild(activeContent.nativeElement);
  }
}
