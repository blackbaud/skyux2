import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sky-demo-app',
  template: require('./radio.component.visual-fixture.html')
})
export class AppComponent {
  public selectedValue = '3';
  public valueGuy = '2';
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SkyModule
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
