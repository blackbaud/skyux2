import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkySectionedFormModule } from '../';
import { SkySectionedFormFixtureComponent } from './sectioned-form.component.fixture';

import {
  SkySectionedFormNoSectionsFixtureComponent
} from './sectioned-form-no-sections.component.fixture';

import {
  SkySectionedFormNoActiveFixtureComponent
} from './sectioned-form-no-active.component.fixture';

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
    SkySectionedFormFixtureInformation2Component,
    SkySectionedFormNoSectionsFixtureComponent,
    SkySectionedFormNoActiveFixtureComponent
  ],
  imports: [
    CommonModule,
    SkySectionedFormModule
  ],
  exports: [
    SkySectionedFormFixtureComponent,
    SkySectionedFormFixtureInformation1Component,
    SkySectionedFormFixtureInformation2Component,
    SkySectionedFormNoSectionsFixtureComponent,
    SkySectionedFormNoActiveFixtureComponent
  ]
})
export class SkySectionedFormFixturesModule { }
