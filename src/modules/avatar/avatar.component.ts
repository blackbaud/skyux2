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
import { SkyErrorModalService } from '../error/error-modal.service';
import { ErrorModalConfig } from '../error/error-modal-config';
import { SkyResources } from '../resources/resources';

@Component({
  selector: 'sky-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
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

  constructor(private errorService: SkyErrorModalService) {}

  public photoDrop(result: SkyFileDropChange) {
    if (result.files && result.files.length > 0) {
      this.avatarChanged.emit(result.files[0]);
    } else {
      this.openErrorModal();
    }
  }

  private openErrorModal() {
    const config: ErrorModalConfig = {
      errorTitle: SkyResources.getString('avatar_file_upload_error_title'),
      errorDescription: SkyResources.getString('avatar_file_upload_error_description'),
      errorCloseText: SkyResources.getString('errormodal_ok')
    };

    this.errorService.open(config);
  }
}
