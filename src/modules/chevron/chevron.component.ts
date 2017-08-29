import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sky-chevron',
  styleUrls: ['./chevron.component.scss'],
  templateUrl: './chevron.component.html'
})
export class SkyChevronComponent {
  @Output()
  public directionChange = new EventEmitter<string>();

  @Input()
  public direction = 'up';

  @Input()
  public disabled: boolean = false;

  private _tabIndex: number = 0;

  @Input()
  public set tabIndex(value: number) {
    this._tabIndex = value;
  }

  public get tabIndex(): number {
    return this.disabled ? -1 : this._tabIndex;
  }

  public chevronClick() {
    if (!this.disabled) {
      this.direction = this.direction === 'up' ? 'down' : 'up';
      this.directionChange.emit(this.direction);
    }
  }
}
