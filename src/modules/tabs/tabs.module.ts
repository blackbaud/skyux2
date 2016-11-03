import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDropdownModule } from '../dropdown';

import { SkyTabButtonComponent } from './tab-button.component';
import { SkyTabDropdownComponent } from './tab-dropdown.component';
import { SkyTabComponent } from './tab.component';
import { SkyTabsetComponent } from './tabset.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyTabButtonComponent,
    SkyTabComponent,
    SkyTabDropdownComponent,
    SkyTabsetComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule,
    SkyResourcesModule
  ],
  exports: [
    SkyTabComponent,
    SkyTabsetComponent
  ]
})
export class SkyTabsModule { }
