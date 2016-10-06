import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDropdownModule } from '../dropdown';

import { SkyTabButtonComponent } from './tab-button.component';
import { SkyTabDropdownComponent } from './tab-dropdown.component';
import { SkyTabComponent } from './tab.component';
import { SkyTabsetAdapterService } from './tabset-adapter.service';
import { SkyTabsetComponent } from './tabset.component';
import { SkyTabsetService } from './tabset.service';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyTabButtonComponent,
    SkyTabComponent,
    SkyTabDropdownComponent,
    SkyTabsetComponent
  ],
  providers: [
    SkyTabsetService,
    SkyTabsetAdapterService
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
