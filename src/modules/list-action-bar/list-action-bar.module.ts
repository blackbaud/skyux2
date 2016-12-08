import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyListActionBarComponent } from './list-action-bar.component';
import { SkyListActionBarItemComponent } from './list-action-bar-item.component';

@NgModule({
  declarations: [
    SkyListActionBarComponent,
    SkyListActionBarItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyListActionBarComponent,
    SkyListActionBarItemComponent
  ]
})
export class SkyListActionBarModule {
}
