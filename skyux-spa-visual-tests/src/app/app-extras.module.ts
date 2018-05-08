import { NgModule } from '@angular/core';

import { FlyoutDemoComponent } from './flyout/flyout-demo.component';
import { ToastDemoComponent } from './toast/toast-demo.component';

import { ModalDemoComponent } from './modal/modal-demo.component';
import { ModalLargeDemoComponent } from './modal/modal-large-demo.component';
import { ModalFullPageDemoComponent } from './modal/modal-fullpage-demo.component';
import { ModalContentDemoComponent } from './modal/modal-content-demo.component';
import { ModalTiledDemoComponent } from './modal/modal-tiled-demo.component';

import { Tile1Component } from './tiles/tile1.component';
import { Tile2Component } from './tiles/tile2.component';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [],
  entryComponents: [
    FlyoutDemoComponent,
    ToastDemoComponent,
    ModalDemoComponent,
    ModalLargeDemoComponent,
    ModalFullPageDemoComponent,
    ModalContentDemoComponent,
    ModalTiledDemoComponent,
    Tile1Component,
    Tile2Component
  ]
})
export class AppExtrasModule { }
