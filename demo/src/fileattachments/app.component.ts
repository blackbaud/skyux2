import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';

class FileItem extends File {
  public url: string;
}

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html')
})
class AppComponent {
  public filesToUpload: Array<FileItem>;

  constructor() {
    this.filesToUpload = [];
  }


  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<FileItem>> fileInput.target.files;
    console.log('hey: ', this.filesToUpload);

    for (let file of this.filesToUpload) {
      var reader = new FileReader();

      reader.onload = function (event: any) {
        console.log(event.target);

        file.url = event.target.result;

      }

      reader.readAsDataURL(file);
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
