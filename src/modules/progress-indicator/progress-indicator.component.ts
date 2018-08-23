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
  public startingIndex: number;

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
    // Set up observation of progress command messages
    this.messageStream
      .takeUntil(this.idle)
      .subscribe((messageType: SkyProgressIndicatorMessageType) => {
        switch (messageType) {
          case SkyProgressIndicatorMessageType.Progress:
            this.progress();
            break;

          case SkyProgressIndicatorMessageType.Regress:
            this.regress();
            break;

          case SkyProgressIndicatorMessageType.Reset:
            this.resetProgress();
            break;

          default:
            throw 'SkyProgressIndicatorMessageType unrecognized.';
        }
        this.progressChanges.emit({
          activeIndex: this.activeIndex
        });
      });

    // Set the initial index
    if (this.startingIndex && this.startingIndex < this.progressItems.length) {
      this.activeIndex = this.startingIndex;

      const startingItem = this.getItemByIndex(this.startingIndex);
      startingItem.isActive = true;

      this.progressItems.forEach((item, index) => {
        if (index < this.startingIndex) {
          item.isComplete = true;
          item.isNextToInactive = false;
        }
      });
    } else {
      const firstItem = this.getItemByIndex(this.activeIndex);
      if (firstItem) {
        firstItem.isActive = true;
      }
    }
    this.progressChanges.emit({
      activeIndex: this.activeIndex
    });

    // Set the last item
    const lastItem = this.getItemByIndex(this.progressItems.length - 1);
    if (lastItem) {
      lastItem.isLastItem = true;
    }

    // Set the horizontal state
    this.progressItems.forEach(element => {
      element.isHorizontal = this.isHorizontal;
    });
  }

  public ngOnDestroy() {
    this.idle.next();
    this.idle.unsubscribe();
  }

  public isNextToCheck(index: number): boolean {
    let nextItem = this.getItemByIndex(index + 1);
    return nextItem && nextItem.isComplete && !nextItem.isActive;
  }

  private progress() {
    if (this.activeIndex === this.progressItems.length) {
      return;
    }
    const completedItem = this.getItemByIndex(this.activeIndex);

    this.activeIndex += 1;
    const activeItem = this.getItemByIndex(this.activeIndex);

    if (completedItem) {
      completedItem.isActive = false;
      completedItem.isComplete = true;
      completedItem.isNextToInactive = false;
    }
    if (activeItem) {
      activeItem.isActive = true;
    }
  }

  private regress() {
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

      if (inactiveItem && !inactiveItem.isComplete) {
        activeItem.isNextToInactive = true;
      }
    }
  }

  private resetProgress() {
    this.activeIndex = 0;
    this.progressItems.forEach((item: SkyProgressIndicatorItemComponent) => {
      item.isActive = false;
      item.isComplete = false;
      item.isNextToInactive = true;
    });
    const firstItem = this.getItemByIndex(this.activeIndex);
    if (firstItem) {
      firstItem.isActive = true;
    }
  }

  private getItemByIndex(index: number) {
    return this.progressItems.find((item: any, i: number) => {
      return (i === index);
    });
  }
}
