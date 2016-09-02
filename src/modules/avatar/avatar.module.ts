import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyAvatarComponent } from './avatar.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [SkyAvatarComponent],
  imports: [CommonModule, SkyResourcesModule],
  exports: [SkyAvatarComponent]
})
export class SkyAvatarModule { }
