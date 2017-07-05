import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyInlineHelpComponent } from './inline-help.component';

@NgModule({
    declarations: [
        SkyInlineHelpComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SkyInlineHelpComponent
    ]
})
export class SkyInlineHelpModule { }