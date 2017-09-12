import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkySectionedFormModule } from '../';
import { SkySectionedFormFixtureComponent } from './sectioned-form.component.fixture';

import {
  SkySectionedFormFixtureInformation1Component
} from './sectioned-form-fixture-information-1.component';

import {
  SkySectionedFormFixtureInformation2Component
} from './sectioned-form-fixture-information-2.component';

@NgModule({
  declarations: [
    SkySectionedFormFixtureComponent,
    SkySectionedFormFixtureInformation1Component,
    SkySectionedFormFixtureInformation2Component
  ],
  imports: [
    CommonModule,
    SkySectionedFormModule
  ],
  exports: [
    SkySectionedFormFixtureComponent,
    SkySectionedFormFixtureInformation1Component,
    SkySectionedFormFixtureInformation2Component
  ]
})
export class SkySectionedFormFixturesModule { }
