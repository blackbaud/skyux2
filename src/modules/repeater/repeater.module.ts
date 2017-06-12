import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SkyChevronModule } from '../chevron';
import { SkyLogModule } from '../log';

import { SkyRepeaterItemContentComponent } from './repeater-item-content.component';
import { SkyRepeaterItemContextMenuComponent } from './repeater-item-context-menu.component';
import { SkyRepeaterItemTitleComponent } from './repeater-item-title.component';
import { SkyRepeaterItemComponent } from './repeater-item.component';
import { SkyRepeaterComponent } from './repeater.component';
import { SkyRepeaterService } from './repeater.service';
import { SkyCheckboxModule } from '../checkbox';
import { SkyResourcesModule } from '../resources/resources.module';

@NgModule({
  declarations: [
    SkyRepeaterComponent,
    SkyRepeaterItemComponent,
    SkyRepeaterItemContentComponent,
    SkyRepeaterItemContextMenuComponent,
    SkyRepeaterItemTitleComponent
  ],
  providers: [
    SkyRepeaterService
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SkyChevronModule,
    SkyLogModule,
    SkyCheckboxModule,
    SkyResourcesModule
  ],
  exports: [
    SkyRepeaterComponent,
    SkyRepeaterItemComponent,
    SkyRepeaterItemContentComponent,
    SkyRepeaterItemContextMenuComponent,
    SkyRepeaterItemTitleComponent
  ]
})
export class SkyRepeaterModule { }
