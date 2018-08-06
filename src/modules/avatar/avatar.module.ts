import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyFileAttachmentsModule } from '../fileattachments';
import { SkyAvatarComponent } from './avatar.component';
import { SkyAvatarInnerComponent } from './avatar.inner.component';
import { SkyResourcesModule } from '../resources';
import { SkyModalModule } from '../modal/modal.module';
import { SkyErrorModalService } from '../error/error-modal.service';
import { SkyAvatarCropModalComponent } from './avatar-crop-modal.component';

@NgModule({
  declarations: [SkyAvatarInnerComponent, SkyAvatarComponent, SkyAvatarCropModalComponent],
  imports: [CommonModule, SkyResourcesModule, SkyFileAttachmentsModule, SkyModalModule, FormsModule],
  exports: [SkyAvatarComponent, SkyAvatarInnerComponent, SkyAvatarCropModalComponent],
  providers: [SkyErrorModalService],
  entryComponents: [SkyAvatarCropModalComponent]
})
export class SkyAvatarModule { }
