import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ContentChildren,
  QueryList
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { SkyVerticalTabsetService } from './../vertical-tabset/vertical-tabset.service';
import { SkySectionedFormSectionComponent } from './sectioned-form-section.component';

@Component({
  selector: 'sky-sectioned-form',
  templateUrl: './sectioned-form.component.html',
  styleUrls: ['./sectioned-form.component.scss'],
  providers: [SkyVerticalTabsetService]
})
export class SkySectionedFormComponent implements OnInit, OnDestroy {

  public indexChanged = new BehaviorSubject(0);

  @ViewChild('skySectionSideContent')
  public content: ElementRef;

  @ContentChildren(SkySectionedFormSectionComponent)
  public sections: QueryList<SkySectionedFormSectionComponent>;

  private _ngUnsubscribe = new Subject();
  private _activeIndex: number;

  public constructor(private tabService: SkyVerticalTabsetService) {}

  public ngOnInit() {
    this.tabService.tabClicked
      .takeUntil(this._ngUnsubscribe)
      .subscribe(activeIndex => {
        if (activeIndex >= 0) {
          this._activeIndex = activeIndex;
          this.indexChanged.next(activeIndex);
        }
      });

    // move tab content to the right
    this.tabService.tabAdded
      .takeUntil(this._ngUnsubscribe)
      .subscribe(tab => {
        if (tab && tab.tabContent) {
          this.content.nativeElement.appendChild(tab.tabContent.nativeElement);
        }
      });
  }

  public setRequired(required: boolean) {
    if (this.sections && this.sections.length > 0) {
      let section = this.sections.toArray().find(s => s.tab.index === this._activeIndex );
      if (section) {
        section.fieldRequired = required;
      }
    }
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
