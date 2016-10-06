import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule, SkyFileItem } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html')
})
class AppComponent {
  public filesToUpload: Array<SkyFileItem>;

  constructor() {
    this.filesToUpload = [];
  }

  public filesUpdated(newFiles: Array<SkyFileItem>) {
    this.filesToUpload = this.filesToUpload.concat(newFiles);
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
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
