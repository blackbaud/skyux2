import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyModalModule } from '../../modal';

import { SkyTabsModule } from '../';
import { TabsetTestComponent } from './tabset.component.fixture';
import { SkyWizardTestFormComponent } from './tabset-wizard.component.fixture';

@NgModule({
  declarations: [
    TabsetTestComponent,
    SkyWizardTestFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyModalModule,
    SkyTabsModule
  ],
  exports: [
    TabsetTestComponent,
    SkyWizardTestFormComponent
  ],
  entryComponents: [
    SkyWizardTestFormComponent
  ]
})
export class SkyTabsFixturesModule { }
