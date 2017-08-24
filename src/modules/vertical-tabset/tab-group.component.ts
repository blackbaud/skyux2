import {
  Component,
  Input,
  QueryList,
  ContentChildren,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate,
  state
} from '@angular/animations';

import { SkyVerticalTabComponent } from './vertical-tab.component';
import { SkyVerticalTabsetService } from './vertical-tabset.service';

@Component({
  selector: 'sky-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('slide', [
    state('down', style({
      overflow: 'hidden',
      height: '*'
    })),
    state('up', style({
      overflow: 'hidden',
      height: 0
    })),
    transition(
      'up <=> down',
      animate('150ms ease-in')
    )
  ])]
})
export class SkyTabGroupComponent implements AfterViewInit {

  @Input()
  public groupHeading: string;

  @Input()
  public disabled: boolean;

  private _open: boolean = false;
  private _openBeforeTabsHidden: boolean = false;

  public get open(): boolean {
    return !this.disabled && this._open;
  }

  @Input()
  public set open(value: boolean) {
    this._open = value;
  }

  @ContentChildren(SkyVerticalTabComponent)
  private tabs: QueryList<SkyVerticalTabComponent>;

  constructor(
    private tabService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef) {}

  public ngAfterViewInit() {
    this.tabService.hidingTabs.subscribe(this.tabsHidden);
    this.tabService.showingTabs.subscribe(this.tabsShown);
    this.tabService.tabClicked.subscribe(this.tabClicked);
  }

  public groupClicked() {
    if (!this.disabled) {
      this.open = !this.open;
    }

    this.changeRef.markForCheck();
  }

  public subMenuOpen(): boolean {
    return this.tabs && (this.tabs.find(t => t.active) !== undefined);
  }

  public tabClicked = () => {
    this.changeRef.markForCheck();
  }

  public tabsHidden = () => {
    // this fixes an animation bug with ngIf when the parent component goes from visible to hidden
    this._openBeforeTabsHidden = this.open;
    this.open = false;
    this.changeRef.markForCheck();
  }

  public tabsShown = () => {
    this.open = this._openBeforeTabsHidden;
    this.changeRef.detectChanges();
  }
}
