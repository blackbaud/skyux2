import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges
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
export class SkyTabsetComponent
  implements AfterContentInit, AfterViewInit, DoCheck, OnDestroy, OnChanges {
  @Input()
  public tabStyle = 'tabs';

  @Input()
  public active: number | string;

  @Output()
  public newTab = new EventEmitter<any>();

  @Output()
  public openTab = new EventEmitter<any>();

  @Output()
  public activeChange = new EventEmitter<any>();

  public tabDisplayMode = 'tabs';

  @ContentChildren(SkyTabComponent)
  public tabs: QueryList<SkyTabComponent>;

  constructor(
    private tabsetService: SkyTabsetService,
    private adapterService: SkyTabsetAdapterService,
    private elRef: ElementRef,
    private changeRef: ChangeDetectorRef
  ) {
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

  public selectTab(newTab: SkyTabComponent) {
    this.tabsetService.activateTab(newTab);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['active'] && changes['active'].currentValue !== changes['active'].previousValue) {
      this.tabsetService.activateTabIndex(this.active);
    }

  }

  public ngAfterContentInit() {
    if (this.active || this.active === 0) {
      this.tabsetService.activateTabIndex(this.active);
    }
    this.tabsetService.activeIndex.distinctUntilChanged().subscribe((newActiveIndex) => {

         // HACK: Not selecting the active tab in a timeout causes an error.
        // https://github.com/angular/angular/issues/6005
        setTimeout(() => {
          if (newActiveIndex !== this.active) {
            this.active = newActiveIndex;
            this.activeChange.emit(newActiveIndex);
          }
        });
    });
  }

  public ngAfterViewInit() {
    this.adapterService.init(this.elRef);

    this.adapterService.overflowChange.subscribe((currentOverflow: boolean) => {
      this.updateDisplayMode(currentOverflow);
    });

    setTimeout(() => {
      this.adapterService.detectOverflow();
      this.updateDisplayMode(this.adapterService.currentOverflow);
      this.changeRef.detectChanges();
    }, 0);
  }

  public ngDoCheck() {
    this.adapterService.detectOverflow();
  }

  public ngOnDestroy() {
    this.tabsetService.destroy();
  }

  private updateDisplayMode(currentOverflow: boolean) {
    this.tabDisplayMode = currentOverflow ? 'dropdown' : 'tabs';
  }
}
