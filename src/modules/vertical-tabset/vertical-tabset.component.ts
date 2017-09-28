import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SkyResourcesService } from './../resources/resources.service';

import {
  SkyVerticalTabsetService,
  VISIBLE_STATE
} from './vertical-tabset.service';

import { SkyMediaQueryService } from './../media-queries/media-query.service';

@Component({
  selector: 'sky-vertical-tabset',
  templateUrl: './vertical-tabset.component.html',
  styleUrls: ['./vertical-tabset.component.scss'],
  providers: [SkyVerticalTabsetService, SkyResourcesService, SkyMediaQueryService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'tabGroupEnter', [
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
export class SkyVerticalTabsetComponent implements OnInit, AfterViewChecked, OnDestroy {

  @Input()
  public showTabsText: string = this.resources.getString('vertical_tabs_show_tabs_text');

  @Output()
  public activeChange = new EventEmitter<number>();

  @ViewChild('contentWrapper')
  public tabGroups: ElementRef;

  @ViewChild('skySideContent')
  public content: ElementRef;

  private _ngUnsubscribe = new Subject();

  constructor(
    public tabService: SkyVerticalTabsetService,
    private resources: SkyResourcesService,
    private changeRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.tabService.indexChanged
      .takeUntil(this._ngUnsubscribe)
      .subscribe(index => {
        this.activeChange.emit(index);
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
    this._ngUnsubscribe.complete();
  }
}
