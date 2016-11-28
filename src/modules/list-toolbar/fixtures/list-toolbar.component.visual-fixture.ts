import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';
import {
  ListState,
  ListStateDispatcher
} from '../../../../src/modules/list/state';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './list-toolbar.component.visual-fixture.html'
})
export class AppComponent {
  constructor(private state: ListState, private dispatcher: ListStateDispatcher) {
  }
}

@NgModule({
  imports: [
    BrowserModule,
    SkyModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ListState,
    ListStateDispatcher
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
