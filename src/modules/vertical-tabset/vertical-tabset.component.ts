import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { SkyResourcesService } from './../resources/resources.service';
import { SkyVerticalTabsetService } from './vertical-tabset.service';
import { SkyMediaQueryService } from './../media-queries/media-query.service';
import { SkyMediaBreakpoints } from '../media-queries/media-breakpoints';

@Component({
  selector: 'sky-vertical-tabset',
  templateUrl: './vertical-tabset.component.html',
  styleUrls: ['./vertical-tabset.component.scss'],
  providers: [SkyVerticalTabsetService, SkyResourcesService, SkyMediaQueryService],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SkyVerticalTabsetComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('contentWrapper')
  public tabGroups: ElementRef;

  @ViewChild('skySideContent')
  public content: ElementRef;

  @Input()
  public showTabsText: string = this.resources.getString('vertical_tabs_show_tabs_text');

  private _tabsVisible: boolean;
  private _wideScreen: boolean;
  private _mediaSubscription: Subscription;
  private _previousTabsVisible: boolean;

  constructor(
    private tabService: SkyVerticalTabsetService,
    private resources: SkyResourcesService,
    private mediaQueryService: SkyMediaQueryService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this._wideScreen = !this.isMobile();

    // subscribe to window size changes
    this._mediaSubscription = this.mediaQueryService.subscribe(
      (args: SkyMediaBreakpoints) => {
        this.changeRef.detectChanges();
      }
    );
  }

  public ngAfterViewInit() {
    this.tabService.tabClicked.subscribe(this.tabClicked);
  }

  public ngOnDestroy(): void {
    this._mediaSubscription.unsubscribe();
  }

  public tabsVisible(): boolean {
    const isMobile = this.isMobile();
    const switchingToWidescreen = !isMobile && !this._wideScreen;
    const switchingToMobile = isMobile && this._wideScreen;

    // hide tabs when switching from widescreen to mobile
    if (switchingToWidescreen) {
      this._wideScreen = true;
      this.changeRef.detectChanges();
      this.moveActiveTabContent();

    } else if (switchingToMobile) {
      this._tabsVisible = false;
      this._wideScreen = false;
    }

    const visible = !this.isMobile() || this._tabsVisible;

    if (!visible && this._previousTabsVisible) {
      this.tabService.tabsHidden();
    } else if (visible && !this._previousTabsVisible) {
      this.tabService.tabsShown();
    }

    this._previousTabsVisible = visible;

    return visible;
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

    if (activeContent) {
      this.content.nativeElement.appendChild(activeContent.nativeElement);
    }

    this.changeRef.markForCheck();
  }
}
