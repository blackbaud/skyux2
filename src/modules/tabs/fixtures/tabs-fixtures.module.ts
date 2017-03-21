import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyModalModule } from '../../modal';

import { SkyTabsModule } from '../';
import { TabsetTestComponent } from './tabset.component.fixture';
import { SkyWizardTestFormComponent } from './tabset-wizard.component.fixture';
import { TabsetActiveTestComponent } from './tabset-active.component.fixture';

@NgModule({
  declarations: [
    TabsetTestComponent,
    SkyWizardTestFormComponent,
    TabsetActiveTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyModalModule,
    SkyTabsModule
  ],
  exports: [
    TabsetTestComponent,
    SkyWizardTestFormComponent,
    TabsetActiveTestComponent
  ],
  entryComponents: [
    SkyWizardTestFormComponent
  ]
})
export class SkyTabsFixturesModule { }
