import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFileAttachmentsModule } from '../fileattachments';
import { SkyAvatarComponent } from './avatar.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [SkyAvatarComponent],
  imports: [CommonModule, SkyResourcesModule, SkyFileAttachmentsModule],
  exports: [SkyAvatarComponent]
})
export class SkyAvatarModule { }
