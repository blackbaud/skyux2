import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyFileDropComponent } from './file-drop.component';
import { SkyResourcesModule } from '../resources';


@NgModule({
  declarations: [SkyFileDropComponent],
  imports: [CommonModule, SkyResourcesModule, FormsModule],
  exports: [SkyFileDropComponent]

})
export class SkyFileAttachmentsModule { }
