import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyModalModule } from '../modal.module';
import { ModalTestComponent } from './modal.component.fixture';
import { ModalWithValuesTestComponent } from './modal-with-values.component.fixture';
import { ModalAutofocusTestComponent } from './modal-autofocus.component.fixture';
import { ModalFooterTestComponent } from './modal-footer.component.fixture';

@NgModule({
  declarations: [
    ModalTestComponent,
    ModalWithValuesTestComponent,
    ModalAutofocusTestComponent,
    ModalFooterTestComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  entryComponents: [
    ModalTestComponent,
    ModalWithValuesTestComponent,
    ModalAutofocusTestComponent,
    ModalFooterTestComponent
  ]
})
export class SkyModalFixturesModule { }
