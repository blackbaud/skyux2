import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyToolbarComponent } from './toolbar.component';
import { SkyToolbarItemComponent } from './toolbar-item.component';

@NgModule({
  declarations: [
    SkyToolbarComponent,
    SkyToolbarItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyToolbarComponent,
    SkyToolbarItemComponent
  ]
})
export class SkyToolbarModule { }
