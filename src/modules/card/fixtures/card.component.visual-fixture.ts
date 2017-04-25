import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyCardModule } from '../card.module';

import { SkyKeyInfoModule } from '../../key-info';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './card.component.visual-fixture.html'
})
class AppComponent { }

@NgModule({
  imports: [
    BrowserModule,
    SkyCardModule,
    SkyKeyInfoModule
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
