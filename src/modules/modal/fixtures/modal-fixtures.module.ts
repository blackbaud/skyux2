import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyModalModule } from '../modal.module';
import { ModalTestComponent } from './modal.component.fixture';
import { ModalWithValuesTestComponent } from './modal-with-values.component.fixture';

@NgModule({
  declarations: [
    ModalTestComponent,
    ModalWithValuesTestComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  entryComponents: [
    ModalTestComponent,
    ModalWithValuesTestComponent
  ]
})
export class SkyModalFixturesModule { }
