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
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class SkyProgressIndicatorComponent implements AfterContentInit, OnDestroy {

  @Input()
  public get isHorizontal(): boolean {
    return this._isHorizontal || false;
  }
  public set isHorizontal(value: boolean) {
    this._isHorizontal = value;
  }

  @Input()
  public messageStream = new Subject<SkyProgressIndicatorMessageType>();

  @Output()
  public progressChanges = new EventEmitter<SkyProgressIndicatorChange>();

  @ContentChildren(SkyProgressIndicatorItemComponent)
  public progressItems: QueryList<SkyProgressIndicatorItemComponent>;

  private activeIndex = 0;
  private _isHorizontal: boolean;
  private idle = new Subject();

  public ngAfterContentInit() {
    this.messageStream
      .takeUntil(this.idle)
      .subscribe((messageType: SkyProgressIndicatorMessageType) => {
        switch (messageType) {
          case SkyProgressIndicatorMessageType.ItemComplete:
            this.completeItem();
            this.progressChanges.emit({
              activeIndex: this.activeIndex
            });
            break;

          case SkyProgressIndicatorMessageType.ItemIncomplete:
            this.incompleteItem();
            this.progressChanges.emit({
              activeIndex: this.activeIndex
            });
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

    this.progressItems.forEach(element => {
      element.isHorizontal = this.isHorizontal;
    });
  }

  public ngOnDestroy() {
    this.idle.next();
    this.idle.unsubscribe();
  }

  private completeItem() {
    if (this.activeIndex === this.progressItems.length) {
      return;
    }
    const completedItem = this.getItemByIndex(this.activeIndex);

    this.activeIndex += 1;
    const activeItem = this.getItemByIndex(this.activeIndex);

    if (completedItem) {
      completedItem.isActive = false;
      completedItem.isComplete = true;
    }
    if (activeItem) {
      activeItem.isActive = true;
    }
  }

  private incompleteItem() {
    if (this.activeIndex === 0) {
      return;
    }
    const inactiveItem = this.getItemByIndex(this.activeIndex);

    this.activeIndex -= 1;
    const activeItem = this.getItemByIndex(this.activeIndex);

    if (inactiveItem) {
      inactiveItem.isActive = false;
    }
    if (activeItem) {
      activeItem.isActive = true;
    }
  }

  private resetProgress() {
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

  private setItem(index: number) {
    if (index >= this.progressItems.length || index < 0) {
      throw 'Progress indicator index is out of range.';
    }

    while (this.activeIndex < index) {
      this.completeItem();
    }
    while (this.activeIndex > index) {
      this.incompleteItem();
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
