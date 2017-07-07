import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyInlineHelpComponent } from './inline-help.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
    declarations: [
        SkyInlineHelpComponent
    ],
    imports: [
        CommonModule,
        SkyResourcesModule
    ],
    exports: [
        SkyInlineHelpComponent
    ]
})
export class SkyInlineHelpModule { }