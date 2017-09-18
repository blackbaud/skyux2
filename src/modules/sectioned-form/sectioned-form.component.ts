import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ContentChildren,
  QueryList,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SkyMediaQueryService } from './../media-queries/media-query.service';
import { SkyMediaBreakpoints } from '../media-queries/media-breakpoints';
import { SkyVerticalTabsetService } from './../vertical-tabset/vertical-tabset.service';
import { SkySectionedFormSectionComponent } from './sectioned-form-section.component';

const VISIBLE_STATE = 'shown';

@Component({
  selector: 'sky-sectioned-form',
  templateUrl: './sectioned-form.component.html',
  styleUrls: ['./sectioned-form.component.scss'],
  providers: [SkyVerticalTabsetService],
  animations: [
    trigger(
      'tabEnter', [
        transition(`void => ${VISIBLE_STATE}`, [
          style({transform: 'translate(-100%)'}),
          animate('150ms ease-in')
        ])
      ]
    ),
    trigger(
      'contentEnter', [
        transition(`void => ${VISIBLE_STATE}`, [
          style({transform: 'translate(100%)'}),
          animate('150ms ease-in')
        ])
      ]
    )
  ]
})
export class SkySectionedFormComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Output()
  public indexChanged: EventEmitter<number> = new EventEmitter();

  @ViewChild('skySectionSideContent')
  public content: ElementRef;

  @ContentChildren(SkySectionedFormSectionComponent)
  public sections: QueryList<SkySectionedFormSectionComponent>;

  public animationVisibleState: string;

  private _ngUnsubscribe = new Subject();
  private _activeIndex: number;
  private _tabsVisible: boolean;
  private _contentAdded: boolean = false;

  public constructor(
    private tabService: SkyVerticalTabsetService,
    private mediaQueryService: SkyMediaQueryService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.tabService.tabClicked
    .takeUntil(this._ngUnsubscribe)
    .subscribe(this.tabClicked);

    if (this.isMobile()) {
      this.animationVisibleState = VISIBLE_STATE;
    }
  }

  public ngAfterViewChecked() {
    if (!this.isMobile() && !this._contentAdded) {
      // switching to widescreen
      this.moveContent();

    } else if (this._contentAdded && !this.contentVisible()) {
      // switching to mobile
      this._contentAdded = false;
    }
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  public setRequired(required: boolean) {
    if (this.sections && this.sections.length > 0) {
      let section = this.sections.toArray().find(s => s.tab.index === this._activeIndex );
      if (section) {
        section.fieldRequired = required;
      }
    }
  }

  public isMobile() {
    return this.mediaQueryService.current === SkyMediaBreakpoints.xs;
  }

  public tabsVisible() {
    return !this.isMobile() || this._tabsVisible;
  }

  public contentVisible() {
    return !this.isMobile() || !this._tabsVisible;
  }

  public showTabs() {
    this._tabsVisible = true;
    this.animationVisibleState = VISIBLE_STATE;
    this._contentAdded = false;
  }

  public tabClicked = () => {
    if (this.isMobile()) {
      this._tabsVisible = false;
      this.animationVisibleState = VISIBLE_STATE;
      this._contentAdded = false;
      this.changeRef.detectChanges();
    }

    this._activeIndex = this.tabService.activeIndex;
    this.indexChanged.emit(this._activeIndex);

    if (this.contentVisible()) {
      this.moveContent();
    }
  }

  public moveContent() {
    if (this.content) {
      let activeContent = this.tabService.activeTabContent();

      if (activeContent && activeContent.nativeElement) {
        this.content.nativeElement.appendChild(activeContent.nativeElement);
        this._contentAdded = true;
      }
    }
  }
}
