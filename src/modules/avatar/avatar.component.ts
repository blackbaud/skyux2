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

  public maxFileSize = 500000;

  private _canChange: boolean;

  private _src: SkyAvatarSrc;

  private _name: string;

  constructor(private errorService: SkyErrorModalService) {}

  public photoDrop(result: SkyFileDropChange) {
    /* sanity check */
    /* istanbul ignore else */
    if (result.files && result.files.length > 0) {
      this.avatarChanged.emit(result.files[0]);
    } else if (result.rejectedFiles && result.rejectedFiles.length > 0) {
      this.handleError(result.rejectedFiles);
    }
  }

  private handleError(rejectedFiles: Array<SkyFileItem>) {
    const rejectedFile = rejectedFiles[0];

    if (rejectedFile.errorType === 'maxFileSize') {
      const title = SkyResources.getString('avatar_error_too_large_title');
      const descriptionResource = SkyResources.getString('avatar_error_too_large_description');
      const description = descriptionResource.replace('{0}', this.maxFileSizeText());

      this.openErrorModal(title, description);

    } else if (rejectedFile.errorType === 'fileType') {
      const title = SkyResources.getString('avatar_error_not_image_title');
      const description = SkyResources.getString('avatar_error_not_image_description');

      this.openErrorModal(title, description);
    }
  }

  private maxFileSizeText() {
    return `${(this.maxFileSize / 1000)} KB`;
  }

  private openErrorModal(title: string, description: string) {
    const config: ErrorModalConfig = {
      errorTitle: title,
      errorDescription: description,
      errorCloseText: SkyResources.getString('errormodal_ok')
    };

    this.errorService.open(config);
  }
}
