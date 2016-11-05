import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SkyModule } from '../../../src/core';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public name = 'Robert C. Hernandez';

  public showAlert = true;

  public showImage = true;

  public showTitle = true;

  public showSubtitle = true;

  public showStatus = true;

  public showContent = true;

  public showKeyInfo = true;
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
