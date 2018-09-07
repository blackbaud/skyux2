import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  SkyTabButtonComponent
} from './tab-button.component';
import {
  SkyTabDropdownComponent
} from './tab-dropdown.component';
import {
  SkyTabComponent
} from './tab.component';
import {
  SkyTabsetComponent
} from './tabset.component';
import {
  SkyTabsetNavButtonComponent
} from './tabset-nav-button.component';

import {
 SkyDropdownModule
} from '../dropdown';
import {
  SkyResourcesModule
} from '../resources';
import {
  SkyIconModule
} from '../icon';

@NgModule({
  declarations: [
    SkyTabButtonComponent,
    SkyTabComponent,
    SkyTabDropdownComponent,
    SkyTabsetComponent,
    SkyTabsetNavButtonComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [
    SkyTabComponent,
    SkyTabsetComponent,
    SkyTabsetNavButtonComponent
  ]
})
export class SkyTabsModule { }
