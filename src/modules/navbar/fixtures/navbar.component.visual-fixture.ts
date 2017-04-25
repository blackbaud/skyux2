import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyNavbarModule } from '../navbar.module';

import { SkyDropdownModule } from '../../dropdown';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './navbar.component.visual-fixture.html'
})
export class AppComponent { }

@NgModule({
  imports: [
    BrowserModule,
    SkyNavbarModule,
    SkyDropdownModule
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
