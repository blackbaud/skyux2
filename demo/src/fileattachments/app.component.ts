import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule, SkyFileItem, SkyFileDropChange } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html')
})
class AppComponent {
  public filesToUpload: Array<SkyFileItem>;

  public rejectedFiles: Array<SkyFileItem>;

  public maxFileSize: number = 4000000;

  public acceptedTypes: Array<String>;

  constructor() {
    this.filesToUpload = [];
    this.rejectedFiles = [];
  }

  public filesUpdated(result: SkyFileDropChange) {
    this.filesToUpload = this.filesToUpload.concat(result.files);
    this.rejectedFiles = this.rejectedFiles.concat(result.rejectedFiles);
  }

  public validateFile(file: SkyFileItem) {
    if (file.name.indexOf('a') === 0) {
        return 'You may not upload a file that begins with the letter "a."';
    }
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
