import { Component } from '@angular/core';

import { SkyFileItem } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-avatar-demo',
  templateUrl: './avatar-demo.component.html'
})
export class SkyAvatarDemoComponent {
  public name = 'Robert C. Hernandez';
  public showImage = true;
  public avatarUrl: string | File = 'https://imgur.com/tBiGElW.png';

  public get src(): string | File {
    return this.showImage ?  this.avatarUrl : undefined;
  }

  public updateSrc(fileItem: SkyFileItem) {
    /*
      This is where you might upload the new avatar,
      but for this demo we'll just update it locally.
    */
    if (fileItem) {
      this.avatarUrl = fileItem.file;
    }
  }
}
