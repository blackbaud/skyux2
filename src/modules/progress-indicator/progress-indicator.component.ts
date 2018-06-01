import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyProgressIndicatorChange,
  SkyProgressIndicatorMessageType
} from './types';
import {
  SkyProgressIndicatorItemComponent
} from './progress-indicator-item';

@Component({
  selector: 'sky-progress-indicator',
  templateUrl: './progress-indicator.component.html'
})
export class SkyProgressIndicatorComponent implements AfterContentInit, OnDestroy {

  private idle = new Subject();
  private _activeIndex = 0;

  @Input()
  public messageStream = new Subject<SkyProgressIndicatorMessageType>();

  @Output()
  public progressChanges = new EventEmitter<SkyProgressIndicatorChange>();

  public get activeIndex(): number {
    return this._activeIndex;
  }
  public set activeIndex(value: number) {
    if (value < 0) {
      value = this.progressItems.length - 1;
    }
    this._activeIndex = value;
  }

  @ContentChildren(SkyProgressIndicatorItemComponent)
  public progressItems: QueryList<SkyProgressIndicatorItemComponent>;

  public ngAfterContentInit() {
    this.messageStream
      .takeUntil(this.idle)
      .subscribe((messageType: SkyProgressIndicatorMessageType) => {
        switch (messageType) {
          case SkyProgressIndicatorMessageType.ItemComplete:
            this.completeItem();
            break;

          case SkyProgressIndicatorMessageType.ItemIncomplete:
            this.incompleteItem();
            break;

          case SkyProgressIndicatorMessageType.ProgressReset:
            this.resetProgress();
            break;

          default:
            throw 'SkyProgressIndicatorMessageType unrecognized.';
        }
      });

    const firstItem = this.getItemByIndex(this.activeIndex);
    if (firstItem) {
      firstItem.isActive = true;
    }
    this.progressChanges.emit({
      activeIndex: this.activeIndex
    });

    const lastItem = this.getItemByIndex(this.progressItems.length - 1);
    if (lastItem) {
      lastItem.isLastItem = true;
    }
  }

  public ngOnDestroy() {
    this.idle.next();
    this.idle.unsubscribe();
  }

  public completeItem() {

    const completedItem = this.getItemByIndex(this.activeIndex);

    this.activeIndex += 1;
    const activeItem = this.getItemByIndex(this.activeIndex);

    if (completedItem) {
      completedItem.isActive = false;
      completedItem.isComplete = true;
    }
    if (activeItem) {
      activeItem.isActive = true;
      activeItem.isComplete = false;
    }
    this.progressChanges.emit({
      activeIndex: this.activeIndex
    });

  }

  public incompleteItem() {
    const inactiveItem = this.getItemByIndex(this.activeIndex);

    this.activeIndex -= 1;
    const activeItem = this.getItemByIndex(this.activeIndex);

    if (inactiveItem) {
      inactiveItem.isActive = false;
      inactiveItem.isComplete = false;
    }
    if (activeItem) {
      activeItem.isActive = true;
      activeItem.isComplete = false;
    }
    this.progressChanges.emit({
      activeIndex: this.activeIndex
    });

  }

  public resetProgress() {
    this.activeIndex = 0;
    this.progressItems.forEach((item: SkyProgressIndicatorItemComponent) => {
      item.isActive = false;
      item.isComplete = false;
    });
    const firstItem = this.getItemByIndex(this.activeIndex);
    if (firstItem) {
      firstItem.isActive = true;
    }
    this.progressChanges.emit({
      activeIndex: this.activeIndex
    });
  }

  private getItemByIndex(index: number) {
    return this.progressItems.find((item: any, i: number) => {
      return (i === index);
    });
  }
}
