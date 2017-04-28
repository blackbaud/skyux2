import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyRadioModule } from '../radio.module';

import { Bootstrapper } from '../../../../visual/bootstrapper';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './radio.component.visual-fixture.html'
})
export class AppComponent {
  public selectedValue = '3';
  public valueGuy = '2';
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SkyRadioModule
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
