import { NgModule } from '@angular/core';

import { SKY_MODAL_PROVIDERS } from './modules/modal';
import { SkyAlertModule } from './modules/alert';
// import { SkyAvatarModule } from './modules/avatar';
import { SkyCardModule } from './modules/card';
import { SkyCheckboxModule } from './modules/checkbox';
import { SkyChevronModule } from './modules/chevron';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyKeyInfoModule } from './modules/key-info';
import { SkyLabelModule } from './modules/label';
import { SkyModalModule } from './modules/modal';
import { SkyRepeaterModule } from './modules/repeater';
import { SkyTabsModule } from './modules/tabs';
import { SkyTilesModule } from './modules/tiles';

@NgModule({
  exports: [
    SkyAlertModule,
    // SkyAvatarModule,
    SkyCardModule,
    SkyCheckboxModule,
    SkyChevronModule,
    SkyDropdownModule,
    SkyKeyInfoModule,
    SkyLabelModule,
    SkyModalModule,
    SkyRepeaterModule,
    SkyTabsModule,
    SkyTilesModule
  ]
})
export class SkyModule { }

export * from './modules/alert';
// export * from './modules/avatar';
export * from './modules/card';
export * from './modules/checkbox';
export * from './modules/dropdown';
export * from './modules/key-info';
export * from './modules/label';
export * from './modules/modal';
export * from './modules/repeater';
export * from './modules/tabs';
export * from './modules/tiles';

export const SKY_PROVIDERS: any[] = [
  ...SKY_MODAL_PROVIDERS
];
