import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyResourcesModule } from '../resources';
import { SkyModalModule } from '../modal';
import { SkyListModule } from '../list';
import { SkyDropdownModule } from '../dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SkySelectFieldInputDirective } from './select-field-input.directive';
import { SkySelectFieldComponent } from './select-field.component';
import { SkySelectFieldFormComponent } from './select-field-form.component';
@NgModule({
  imports: [
    CommonModule,
    SkyModalModule,
    SkyListModule,
    SkyDropdownModule,
    SkyResourcesModule,
    ReactiveFormsModule
  ],
  exports: [
    SkySelectFieldInputDirective,
    SkySelectFieldComponent,
    SkySelectFieldFormComponent
  ],
  declarations: [
    SkySelectFieldInputDirective,
    SkySelectFieldComponent,
    SkySelectFieldFormComponent
  ],
  providers: [],
  entryComponents: [SkySelectFieldFormComponent]
})
export class SkySelectFieldModule { }
