import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SkyVerticalTabComponent } from './vertical-tab.component';
import { SkyMediaQueryService } from './../media-queries/media-query.service';
import { SkyMediaBreakpoints } from '../media-queries/media-breakpoints';

export const VISIBLE_STATE = 'shown';

@Injectable()
export class SkyVerticalTabsetService {

  public tabs: Array<SkyVerticalTabComponent> = [];
  public tabClicked: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  public activeIndex: number = undefined;

  public hidingTabs = new BehaviorSubject(false);
  public showingTabs = new BehaviorSubject(false);
  public tabAdded: BehaviorSubject<SkyVerticalTabComponent> = new BehaviorSubject(undefined);
  public indexChanged: EventEmitter<number> = new EventEmitter();
  public contentUpdated: EventEmitter<boolean> = new EventEmitter();

  public animationVisibleState: string;

  private _content: ElementRef;

  public set content(value: ElementRef) {
    this._content = value;
  }
  private _tabsVisible: boolean = false;
  private _contentAdded: boolean = false;

  public constructor(private mediaQueryService: SkyMediaQueryService) {}

  public addTab(tab: SkyVerticalTabComponent) {
    const index = this.tabs.length;
    tab.index = index;

    this.tabs.push(tab);

    if (tab.active) {
      this.activateTab(tab);
    }

    this.tabAdded.next(tab);
  }

  public activateTab(tab: SkyVerticalTabComponent) {

    // unactivate active tab
    let activeTab = this.tabs.find(t => t.index === this.activeIndex);
    if (activeTab && activeTab.index !== tab.index) {
      activeTab.active = false;
      activeTab.tabDeactivated();
    }

    this.activeIndex = tab.index;
    this.tabClicked.next(true);
    this.updateTabClicked();
  }

  public activeTabContent(): ElementRef {
    let activeTab = this.tabs.find(t => t.index === this.activeIndex);

    if (activeTab) {
      return activeTab.tabContent;
    } else {
      return undefined;
    }
  }

  public tabsHidden() {
    this.hidingTabs.next(true);
  }

  public tabsShown() {
    this.showingTabs.next(true);
  }

  public isMobile() {
    return this.mediaQueryService.current === SkyMediaBreakpoints.xs;
  }

  public updateContent() {
    if (!this.isMobile() && !this._contentAdded) {
      // switching to widescreen
      this.moveContent();

    } else if (this._contentAdded && !this.contentVisible()) {
      // switching to mobile
      this._contentAdded = false;

    } else if (this.contentVisible() && !this._contentAdded) {
      // content needs to be moved
      this.moveContent();
    }
  }

  public tabsVisible() {
    return !this.isMobile() || this._tabsVisible;
  }

  public contentVisible() {
    return !this.isMobile() || !this._tabsVisible;
  }

  public showTabs() {
    this._tabsVisible = true;
    this._contentAdded = false;
    this.animationVisibleState = VISIBLE_STATE;
  }

  private moveContent() {
    if (this._content && !this._contentAdded) {
      let activeContent = this.activeTabContent();

      if (activeContent && activeContent.nativeElement) {
        this._content.nativeElement.appendChild(activeContent.nativeElement);
        this._contentAdded = true;
        this.contentUpdated.emit(true);
      }
    }
  }

  private updateTabClicked() {
    this._contentAdded = false;

    if (this.isMobile()) {
      this._tabsVisible = false;
      this.animationVisibleState = VISIBLE_STATE;
    }

    this.indexChanged.emit(this.activeIndex);
  }
}
