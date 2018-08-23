import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  SkyResourcesService
} from '../../resources/resources.service';

import {
  SkyProgressIndicatorComponent
} from '../progress-indicator.component';
import {
  SkyProgressIndicatorMessageType,
  SkyProgressIndicatorChange
} from '../types';

const buttonTypeNext = 'next';
const buttonTypePrevious = 'previous';

@Component({
  selector: 'sky-progress-indicator-nav-button',
  templateUrl: './progress-indicator-nav-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyProgressIndicatorNavButtonComponent implements OnInit, OnDestroy {
  @Input()
  public progressIndicator: SkyProgressIndicatorComponent;

  @Input()
  public get buttonText(): string {
    if (this._buttonText) {
      return this._buttonText;
    }

    switch (this.buttonType) {
      case buttonTypePrevious:
        return this.resources.getString('wizard_navigator_previous');

      default:
      case buttonTypeNext:
        return this.resources.getString('wizard_navigator_next');
    }
  }
  public set buttonText(value: string) {
    this._buttonText = value;
  }

  @Input()
  public get buttonType(): string {
    return this._buttonType || 'next';
  }
  public set buttonType(value: string) {
    if (value && (value.toLowerCase() === 'next' || value.toLowerCase() === 'previous')) {
      this._buttonType = value;
    }
  }

  @Input()
  public get disabled(): boolean {
    if (this._disabled !== undefined) {
      return this._disabled;
    }

    switch (this.buttonType) {
      case buttonTypePrevious:
        return this.activeIndex === 0;

      default:
      case buttonTypeNext:
        return this.activeIndex >= this.progressIndicator.progressItems.length - 1;
    }
  }
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  private idle = new Subject();
  private _buttonText: string;
  private _buttonType: string;
  private _disabled: boolean;
  private activeIndex = 0;

  constructor(
    private resources: SkyResourcesService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.progressIndicator.progressChanges
    .takeUntil(this.idle)
    .subscribe((changes: SkyProgressIndicatorChange) => {
      this.activeIndex = changes.activeIndex;
      this.changeDetector.detectChanges();
    });
  }

  public ngOnDestroy() {
    this.idle.next();
    this.idle.unsubscribe();
  }

  public buttonClick() {
    switch (this.buttonType) {
      case buttonTypePrevious:
        this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Regress);
        break;

      default:
      case buttonTypeNext:
        this.progressIndicator.messageStream.next(SkyProgressIndicatorMessageType.Progress);
        break;
    }
  }
}
