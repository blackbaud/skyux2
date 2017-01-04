import { NgModule } from '@angular/core';

import { SKY_MODAL_PROVIDERS } from './modules/modal';
import { SKY_WAIT_PROVIDERS } from './modules/wait';
import { SkyAlertModule } from './modules/alert';
import { SkyAvatarModule } from './modules/avatar';
import { SkyCardModule } from './modules/card';
import { SkyCheckboxModule } from './modules/checkbox';
import { SkyChevronModule } from './modules/chevron';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyFileAttachmentsModule } from './modules/fileattachments';
import { SkyKeyInfoModule } from './modules/key-info';
import { SkyLabelModule } from './modules/label';
import { SkyModalModule } from './modules/modal';
import { SkyWaitModule } from './modules/wait';
import { SkyNavbarModule } from './modules/navbar';
import { SkyPageSummaryModule } from './modules/page-summary';
import { SkyRadioModule } from './modules/radio';
import { SkyRepeaterModule } from './modules/repeater';
import { SkySearchModule } from './modules/search';
import { SkyTabsModule } from './modules/tabs';
import { SkyTilesModule } from './modules/tiles';

@NgModule({
  exports: [
    SkyAlertModule,
    SkyAvatarModule,
    SkyCardModule,
    SkyCheckboxModule,
    SkyChevronModule,
    SkyDropdownModule,
    SkyFileAttachmentsModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyModalModule,
    SkyNavbarModule,
    SkyPageSummaryModule,
    SkyRadioModule,
    SkyRepeaterModule,
    SkySearchModule,
    SkyTabsModule,
    SkyTilesModule,
    SkyWaitModule
  ]
})
export class SkyModule { }

export * from './modules/alert';
export * from './modules/avatar';
export * from './modules/card';
export * from './modules/checkbox';
export * from './modules/dropdown';
export * from './modules/fileattachments';
export * from './modules/format';
export * from './modules/key-info';
export * from './modules/label';
export * from './modules/modal';
export * from './modules/navbar';
export * from './modules/page-summary';
export * from './modules/radio';
export * from './modules/repeater';
export * from './modules/search';
export * from './modules/tabs';
export * from './modules/tiles';
export * from './modules/wait';

export const SKY_PROVIDERS: any[] = [
  ...SKY_MODAL_PROVIDERS, SKY_WAIT_PROVIDERS
];
