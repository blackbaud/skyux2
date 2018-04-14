import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyResourcesModule } from '../resources';
import { SkyModalModule } from '../modal';
import { SkyListModule } from '../list';
import { SkyDropdownModule } from '../dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SkySelectFieldComponent } from './select-field.component';
import { SkySelectFieldFormComponent } from './select-field-form.component';
import { SkyTokensModule } from '../tokens';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkyDropdownModule,
    SkyListModule,
    SkyModalModule,
    SkyResourcesModule,
    SkyTokensModule
  ],
  exports: [
    SkySelectFieldComponent,
    SkySelectFieldFormComponent
  ],
  declarations: [
    SkySelectFieldComponent,
    SkySelectFieldFormComponent
  ],
  providers: [],
  entryComponents: [SkySelectFieldFormComponent]
})
export class SkySelectFieldModule { }
