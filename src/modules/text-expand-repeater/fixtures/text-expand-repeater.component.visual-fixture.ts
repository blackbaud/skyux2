import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyTextExpandRepeaterModule } from '../text-expand-repeater.module';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './text-expand-repeater.component.visual-fixture.html'
})
class AppComponent {}

@NgModule({
  imports: [
    BrowserModule,
    SkyTextExpandRepeaterModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
