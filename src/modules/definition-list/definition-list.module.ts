import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDefinitionListComponent } from './definition-list.component';
import { SkyDefinitionListContentComponent } from './definition-list-content.component';
import { SkyDefinitionListHeadingComponent } from './definition-list-heading.component';
import { SkyDefinitionListLabelComponent } from './definition-list-label.component';
import { SkyDefinitionListValueComponent } from './definition-list-value.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyDefinitionListComponent,
    SkyDefinitionListContentComponent,
    SkyDefinitionListHeadingComponent,
    SkyDefinitionListLabelComponent,
    SkyDefinitionListValueComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyDefinitionListComponent,
    SkyDefinitionListContentComponent,
    SkyDefinitionListHeadingComponent,
    SkyDefinitionListLabelComponent,
    SkyDefinitionListValueComponent
  ]
})
export class SkyDefinitionListModule { }
