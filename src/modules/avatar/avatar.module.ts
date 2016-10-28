import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFileAttachmentsModule } from '../fileattachments';
import { SkyAvatarComponent } from './avatar.component';
import { SkyAvatarInnerComponent } from './avatar.inner.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [SkyAvatarInnerComponent, SkyAvatarComponent],
  imports: [CommonModule, SkyResourcesModule, SkyFileAttachmentsModule],
  exports: [SkyAvatarComponent, SkyAvatarInnerComponent]
})
export class SkyAvatarModule { }
