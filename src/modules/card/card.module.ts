import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SkyCardActionsComponent } from './card-actions.component';
import { SkyCardContentComponent } from './card-content.component';
import { SkyCardTitleComponent } from './card-title.component';
import { SkyCardComponent } from './card.component';
import { SkyCheckboxModule } from '../checkbox';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyCardActionsComponent,
    SkyCardComponent,
    SkyCardContentComponent,
    SkyCardTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyCheckboxModule,
    SkyResourcesModule
  ],
  exports: [
    SkyCardActionsComponent,
    SkyCardComponent,
    SkyCardContentComponent,
    SkyCardTitleComponent
  ]
})
export class SkyCardModule { }
