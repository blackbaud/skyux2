import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFileDropComponent } from './file-drop.component';
import { SkyFileItem } from './file-item.class';

@NgModule({
  declarations: [SkyFileDropComponent],
  imports: [CommonModule],
  exports: [SkyFileDropComponent]

})
export class SkyFileAttachmentsModule { }
