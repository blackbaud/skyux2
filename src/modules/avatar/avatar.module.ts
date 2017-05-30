import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFileAttachmentsModule } from '../fileattachments';
import { SkyAvatarComponent } from './avatar.component';
import { SkyAvatarInnerComponent } from './avatar.inner.component';
import { SkyResourcesModule } from '../resources';
import { SkyModalModule } from '../modal/modal.module';
import { SkyErrorModalService } from '../error/error-modal.service';

@NgModule({
  declarations: [SkyAvatarInnerComponent, SkyAvatarComponent],
  imports: [CommonModule, SkyResourcesModule, SkyFileAttachmentsModule, SkyModalModule],
  exports: [SkyAvatarComponent, SkyAvatarInnerComponent],
  providers: [SkyErrorModalService]
})
export class SkyAvatarModule { }
