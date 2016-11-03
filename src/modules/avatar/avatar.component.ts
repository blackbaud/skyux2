import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  SkyFileDropChange,
  SkyFileItem
} from '../fileattachments';

import { SkyAvatarSrc } from './avatar-src';

@Component({
  selector: 'sky-avatar',
  template: require('./avatar.component.html'),
  styles: [require('./avatar.component.scss')]
})
export class SkyAvatarComponent {
  public get src(): SkyAvatarSrc {
    return this._src;
  }

  @Input()
  public set src(value: SkyAvatarSrc) {
    this._src = value;
  }

  public get name(): string {
    return this._name;
  }

  @Input()
  public set name(value: string) {
    this._name = value;
  }

  public get canChange(): boolean {
    return this._canChange;
  }

  @Input()
  public set canChange(value: boolean) {
    this._canChange = value;
  }

  @Output()
  public avatarChanged = new EventEmitter<SkyFileItem>();

  private _canChange: boolean;

  private _src: SkyAvatarSrc;

  private _name: string;

  public photoDrop(result: SkyFileDropChange) {
    if (result.files && result.files.length > 0) {
      this.avatarChanged.emit(result.files[0]);
    }
  }
}
