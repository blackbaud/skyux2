import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SkyMediaQueryService } from './../media-queries/media-query.service';

import {
  SkyVerticalTabsetService,
  VISIBLE_STATE
} from './../vertical-tabset/vertical-tabset.service';

@Component({
  selector: 'sky-sectioned-form',
  templateUrl: './sectioned-form.component.html',
  styleUrls: ['./sectioned-form.component.scss'],
  providers: [SkyVerticalTabsetService, SkyMediaQueryService],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private _ngUnsubscribe = new Subject();

  constructor(
    public tabService: SkyVerticalTabsetService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.tabService.indexChanged
      .takeUntil(this._ngUnsubscribe)
      .subscribe(index => {
        this.indexChanged.emit(index);
        this.changeRef.markForCheck();
      });

    this.tabService.switchingMobile
      .takeUntil(this._ngUnsubscribe)
      .subscribe((mobile: boolean) => this.changeRef.detectChanges());

    if (this.tabService.isMobile()) {
      this.tabService.animationVisibleState = VISIBLE_STATE;
    }
  }

  public ngAfterViewChecked() {
    this.tabService.content = this.content;
    this.tabService.updateContent();
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.unsubscribe();
  }

  public tabsVisible() {
    return this.tabService.tabsVisible();
  }

  public showTabs() {
    this.tabService.showTabs();
    this.changeRef.markForCheck();
  }
}
