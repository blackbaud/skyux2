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
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

import {
  SkyToastType
} from './types';
// #endregion

const TOAST_OPEN_STATE = 'toastOpen';
const TOAST_CLOSED_STATE = 'toastClosed';

@Component({
  selector: 'sky-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastState', [
      state(TOAST_OPEN_STATE, style({ opacity: 1 })),
      state(TOAST_CLOSED_STATE, style({ opacity: 0 })),
      transition(
        `${TOAST_OPEN_STATE} => ${TOAST_CLOSED_STATE}`,
        animate('150ms linear')
      )
    ])
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

  private isOpen = false;

  private _toastType: SkyToastType;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.isOpen = true;
  }

  public getAnimationState(): string {
    return (this.isOpen) ? TOAST_OPEN_STATE : TOAST_CLOSED_STATE;
  }

  public onAnimationDone(event: AnimationEvent) {
    if (event.toState === TOAST_CLOSED_STATE) {
      this.closed.emit();
      this.closed.complete();
    }
  }

  public close() {
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }
}
