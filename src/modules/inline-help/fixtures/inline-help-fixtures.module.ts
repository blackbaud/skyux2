import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyInlineHelpModule } from '../';
import { InlineHelpTestComponent } from './inline-help.component.fixture';

@NgModule({
    declarations: [
        InlineHelpTestComponent
    ],
    imports: [
        CommonModule,
        SkyInlineHelpModule
    ],
    exports: [
        InlineHelpTestComponent
    ]
})
export class SkyInlineHlpeFixturesModule { }