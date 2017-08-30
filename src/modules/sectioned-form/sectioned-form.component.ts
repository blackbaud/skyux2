import { Component, AfterViewInit, OnDestroy } from '@angular/core';
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

  private _ngUnsubscribe = new Subject();

  public constructor(private tabService: SkyVerticalTabsetService) {}

  public ngAfterViewInit() {
    this.tabService.tabClicked
      .takeUntil(this._ngUnsubscribe)
      .subscribe(activeIndex => this.indexChanged.next(activeIndex));
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
