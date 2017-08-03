import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyHelpInlineComponent } from './help-inline.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
    declarations: [
        SkyHelpInlineComponent
    ],
    imports: [
        CommonModule,
        SkyResourcesModule
    ],
    exports: [
        SkyHelpInlineComponent
    ]
})
export class SkyHelpInlineModule { }
