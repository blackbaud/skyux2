import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule, SkyFileItem, SkyFileDropChange, SkyFileLink } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html')
})
class AppComponent {
  public filesToUpload: Array<SkyFileItem>;

  public allItems: Array<SkyFileItem | SkyFileLink>;

  public linksToUpload: Array<SkyFileLink>;

  public rejectedFiles: Array<SkyFileItem>;

  public maxFileSize: number = 4000000;

  public acceptedTypes: Array<String>;

  constructor() {
    this.filesToUpload = [];
    this.rejectedFiles = [];
    this.allItems = [];
    this.linksToUpload = [];
  }

  private removeFromArray(items:Array<any>, obj: SkyFileItem | SkyFileLink) {
      let i: number,
          n: number;

      if (items) {
          for (i = 0, n = items.length; i < n; i++) {
              if (items[i] === obj) {
                  items.splice(i, 1);
                  break;
              }
          }
      }
  }

  public filesUpdated(result: SkyFileDropChange) {
    this.filesToUpload = this.filesToUpload.concat(result.files);
    this.rejectedFiles = this.rejectedFiles.concat(result.rejectedFiles);
    this.allItems = this.allItems.concat(result.files);
  }

  public linkAdded(result: SkyFileLink) {
    this.linksToUpload = this.linksToUpload.concat(result);
    this.allItems = this.allItems.concat(result);
  }

  public validateFile(file: SkyFileItem) {
    if (file.name.indexOf('a') === 0) {
        return 'You may not upload a file that begins with the letter "a."';
    }
  }

  public deleteFile(file: SkyFileItem | SkyFileLink) {
    this.removeFromArray(this.allItems, file);
    this.removeFromArray(this.filesToUpload, file);
    this.removeFromArray(this.linksToUpload, file);
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
