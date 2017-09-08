import { NgModule } from '@angular/core';
import { SkySectionedFormComponent } from './sectioned-form.component';
import { SkySectionedFormSectionComponent } from './sectioned-form-section.component';
import { SkyVerticalTabsetModule } from '../vertical-tabset/vertical-tabset.module';

@NgModule({
  declarations: [
    SkySectionedFormComponent,
    SkySectionedFormSectionComponent
  ],
  imports: [
    SkyVerticalTabsetModule
  ],
  exports: [
    SkySectionedFormComponent,
    SkySectionedFormSectionComponent
  ]
})
export class SkySectionedFormModule { }
