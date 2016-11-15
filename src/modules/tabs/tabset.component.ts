import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Output,
  QueryList
} from '@angular/core';

import { SkyTabComponent } from './tab.component';
import { SkyTabsetAdapterService } from './tabset-adapter.service';
import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tabset',
  styleUrls: ['./tabset.component.scss'],
  templateUrl: './tabset.component.html',
  providers: [SkyTabsetAdapterService, SkyTabsetService]
})
export class SkyTabsetComponent implements AfterContentInit, AfterViewInit, DoCheck {
  @Output()
  public newTab = new EventEmitter<any>();

  @Output()
  public openTab = new EventEmitter<any>();

  public tabDisplayMode = 'tabs';

  @ContentChildren(SkyTabComponent)
  public tabs: QueryList<SkyTabComponent>;

  constructor(
    private tabsetService: SkyTabsetService,
    private adapterService: SkyTabsetAdapterService,
    private elRef: ElementRef
  ) {
    tabsetService.tabDestroy.subscribe((tab: SkyTabComponent) => {
      if (tab.active) {
        let tabs = this.tabs.toArray();
        let tabIndex = tabs.indexOf(tab);

        // Try selecting the next tab first, and if there's no next tab then
        // try selecting the previous one.
        let newActiveTab = tabs[tabIndex + 1] || tabs[tabIndex - 1];

        /*istanbul ignore else */
        if (newActiveTab) {
          this.selectTab(newActiveTab);
        }
      }
    });
  }

  public selectTab(tab: SkyTabComponent) {
    this.tabs.forEach((existingTab) => {
      if (tab !== existingTab) {
        existingTab.active = false;
      }
    });

    tab.active = true;
  }

  public tabCloseClick(tab: SkyTabComponent) {
    tab.close.emit(undefined);
  }

  public newTabClick() {
    this.newTab.emit(undefined);
  }

  public openTabClick() {
    this.openTab.emit(undefined);
  }

  public windowResize() {
    this.adapterService.detectOverflow();
  }

  public ngAfterContentInit() {
    this.tabsetService.tabActivate.subscribe((tab: SkyTabComponent) => {
      // HACK: Not selecting the active tab in a timeout causes an error.
      // https://github.com/angular/angular/issues/6005
      setTimeout(() => {
        this.selectTab(tab);
      }, 0);
    });
  }

  public ngAfterViewInit() {
    this.adapterService.init(this.elRef);

    this.adapterService.overflowChange.subscribe((currentOverflow: boolean) => {
      this.updateDisplayMode();
    });

    setTimeout(() => {
      this.updateDisplayMode();
    }, 0);
  }

  public ngDoCheck() {
    this.adapterService.detectOverflow();
  }

  private updateDisplayMode() {
    this.tabDisplayMode = this.adapterService.currentOverflow ? 'dropdown' : 'tabs';
  }
}
