// #region imports
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  AnimationEvent
} from '@angular/animations';

import {
  skyAnimationEmerge
} from '../animation';

import {
  SkyToastType
} from './types';
// #endregion

@Component({
  selector: 'sky-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    skyAnimationEmerge
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToastComponent implements OnInit {
  @Input()
  public set toastType(value: SkyToastType) {
    this._toastType = value;
  }

  public get toastType(): SkyToastType {
    return this._toastType || 'info';
  }

  @Output()
  public closed = new EventEmitter<void>();

  public get animationState(): string {
    return (this.isOpen) ? 'open' : 'closed';
  }

  private isOpen = false;

  private _toastType: SkyToastType;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.isOpen = true;
  }

  public onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'closed') {
      this.closed.emit();
      this.closed.complete();
    }
  }

  public close() {
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }
}
