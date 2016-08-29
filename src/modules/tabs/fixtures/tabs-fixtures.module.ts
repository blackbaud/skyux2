import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyTabsModule } from '../';
import { SkyTabsetAdapterService } from '../tabset-adapter.service';
import { TabsetTestComponent } from './tabset.component.fixture';
import { MockTabsetAdapterService } from './tabset-adapter.service.mock';

@NgModule({
  declarations: [
    TabsetTestComponent
  ],
  providers: [
    {
      provide: SkyTabsetAdapterService,
      useClass: MockTabsetAdapterService
    }
  ],
  imports: [
    CommonModule,
    SkyTabsModule
  ],
  exports: [
    TabsetTestComponent
  ]
})
export class SkyTabsFixturesModule { }
