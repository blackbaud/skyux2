import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SkyModule } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './definition-list.component.visual-fixture.html'
})
class AppComponent {
  public personalInfo: {label: string, value?: string}[] = [
    {
      label: 'Job title',
      value: 'Engineer'
    },
    {
      label: 'Hobby',
      value: 'Volleyball'
    },
    {
      label: 'Experience'
    }
  ];

  public systemInfo: {label: string, value?: string}[] = [
    {
      label: 'Username',
      value: 'user1'
    },
    {
      label: 'Role',
      value: 'Admin'
    },
    {
      label: 'Last log-in time'
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
