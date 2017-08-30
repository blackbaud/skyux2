import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { SkyVerticalTabsetService } from './../vertical-tabset/vertical-tabset.service';

@Component({
  selector: 'sky-sectioned-form',
  templateUrl: './sectioned-form.component.html',
  styleUrls: ['./sectioned-form.component.scss'],
  providers: [SkyVerticalTabsetService]
})
export class SkySectionedFormComponent implements AfterViewInit, OnDestroy {

  public indexChanged = new BehaviorSubject(0);

  @ViewChild('skySectionSideContent')
  public content: ElementRef;

  private _ngUnsubscribe = new Subject();

  public constructor(private tabService: SkyVerticalTabsetService) {}

  public ngAfterViewInit() {

    // move tab content to the right
    this.tabService.tabs.forEach(tab => {
      if (tab && tab.tabContent) {
        this.content.nativeElement.appendChild(tab.tabContent.nativeElement);
      }
    });

    this.tabService.tabClicked
      .takeUntil(this._ngUnsubscribe)
      .subscribe(activeIndex => this.indexChanged.next(activeIndex));
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
