import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterContentChecked
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import {
  SkyModalInstance,
  SkySectionedFormComponent
} from '../../../core';

@Component({
  selector: 'sky-sectioned-modal-form-demo',
  templateUrl: './sectioned-modal-form-demo.component.html'
})
export class SkySectionedModalFormDemoComponent implements OnInit, OnDestroy, AfterContentChecked {

  @ViewChild(SkySectionedFormComponent)
  public sectionedFormComponent: SkySectionedFormComponent;

  @ViewChild('skySectionSideContent')
  public content: ElementRef;

  public activeIndexDisplay: number = undefined;
  public activeTab = true;

  private _ngUnsubscribe = new Subject();
  private _activeIndex: number = undefined;

  constructor(public instance: SkyModalInstance) {}

  public ngOnInit() {
    this.sectionedFormComponent.indexChanged
    .takeUntil(this._ngUnsubscribe)
    .subscribe(activeIndex => this._activeIndex = activeIndex);
  }

  public ngAfterContentChecked() {
    this.activeIndexDisplay = this._activeIndex;
  }

  public requiredChange(required: boolean) {
    this.sectionedFormComponent.setRequired(required);
  }

  public ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
