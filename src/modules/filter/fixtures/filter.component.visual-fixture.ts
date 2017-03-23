import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './filter.component.visual-fixture.html'
})
class AppComponent {
  public filtersActive: boolean = false;

  public appliedFilters: Array<any> = [
    {
      label: 'hide orange',
      dismissible: false
    },
    {
      label: 'berry fruit type',
      dismissible: true
    }
  ];
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
