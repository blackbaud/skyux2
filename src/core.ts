import { NgModule } from '@angular/core';

import { SKY_MODAL_PROVIDERS } from './modules/modal';
import { SkyAlertModule } from './modules/alert';
import { SkyCardModule } from './modules/card';
import { SkyCheckboxModule } from './modules/checkbox';

@NgModule({
  imports: [
    SkyAlertModule,
    SkyCardModule,
    SkyCheckboxModule
  ],
  exports: [
    SkyAlertModule,
    SkyCardModule,
    SkyCheckboxModule
  ]
})
export class SkyModule { }

export * from './modules/alert';
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
