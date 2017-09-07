import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SkyModalInstance, SkySectionedFormComponent } from '../../../core';

@Component({
  selector: 'sky-sectioned-modal-form-demo',
  templateUrl: './sectioned-modal-form-demo.component.html'
})
export class SkySectionedModalFormDemoComponent implements OnInit, OnDestroy {

  @ViewChild(SkySectionedFormComponent)
  public sectionedFormComponent: SkySectionedFormComponent;

  @ViewChild('skySectionSideContent')
  public content: ElementRef;

  public activeIndex: number = undefined;
  public activeTab = true;

  private _ngUnsubscribe = new Subject();

  constructor(public instance: SkyModalInstance) {}

  public ngOnInit() {
    this.sectionedFormComponent.indexChanged
    .takeUntil(this._ngUnsubscribe)
    .subscribe(activeIndex => this.activeIndex = activeIndex);
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
