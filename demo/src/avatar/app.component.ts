import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html')
})
class AppComponent {
  public name = 'Robert C. Hernandez';

  public showImage: boolean;

  public get src(): string {
    return this.showImage ? require('./avatar.png') : undefined;
  }
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
