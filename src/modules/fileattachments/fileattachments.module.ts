import {
  NgModule
} from '@angular/core';
import {
  CommonModule,
  DecimalPipe
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';

import {
  SkyResourcesModule
} from '../resources';
import {
  SkyIconModule
} from '../icon';

import {
  SkyFileDropComponent
} from './file-drop.component';
import {
  SkyFileItemComponent
} from './file-item.component';
import {
  SkyFileSizePipe
} from './file-size.pipe';

@NgModule({
  declarations: [
    SkyFileDropComponent,
    SkyFileItemComponent,
    SkyFileSizePipe
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    FormsModule,
    SkyIconModule
  ],
  exports: [
    SkyFileDropComponent,
    SkyFileItemComponent,
    SkyFileSizePipe
  ],
  providers: [
    DecimalPipe
  ]
})
export class SkyFileAttachmentsModule { }
