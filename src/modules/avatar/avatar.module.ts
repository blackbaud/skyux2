import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyErrorModalService
} from '../error';

import {
  SkyFileAttachmentsModule
} from '../fileattachments';

import {
  SkyResourcesModule
} from '../resources';

import {
  SkyModalModule
} from '../modal';

import { SkyAvatarComponent } from './avatar.component';
import { SkyAvatarInnerComponent } from './avatar.inner.component';

@NgModule({
  declarations: [
    SkyAvatarInnerComponent,
    SkyAvatarComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyFileAttachmentsModule,
    SkyModalModule
  ],
  exports: [
    SkyAvatarComponent,
    SkyAvatarInnerComponent
  ],
  providers: [
    SkyErrorModalService
  ]
})
export class SkyAvatarModule { }
