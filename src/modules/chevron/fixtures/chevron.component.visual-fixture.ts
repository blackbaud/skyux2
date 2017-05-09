import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyChevronModule } from '../chevron.module';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './chevron.component.visual-fixture.html'
})
class AppComponent {
  public directionUp = 'up';
  public directionDown = 'down';
}

@NgModule({
  imports: [
    BrowserModule,
    SkyChevronModule
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
