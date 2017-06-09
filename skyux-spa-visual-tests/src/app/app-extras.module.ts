import { NgModule } from '@angular/core';

import { ModalDemoComponent } from './modal/modal-demo.component';
import { ModalLargeDemoComponent } from './modal/modal-large-demo.component';
import { ModalFullPageDemoComponent } from './modal/modal-fullpage-demo.component';
import { ModalContentDemoComponent } from './modal/modal-content-demo.component';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [],
  entryComponents: [
    ModalDemoComponent,
    ModalLargeDemoComponent,
    ModalFullPageDemoComponent,
    ModalContentDemoComponent
  ]
})
export class AppExtrasModule { }
