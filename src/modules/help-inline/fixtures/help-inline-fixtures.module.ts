import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyHelpInlineModule } from '../';
import { HelpInlineTestComponent } from './help-inline.component.fixture';

@NgModule({
    declarations: [
        HelpInlineTestComponent
    ],
    imports: [
        CommonModule,
        SkyHelpInlineModule
    ],
    exports: [
        HelpInlineTestComponent
    ]
})
export class SkyInlineHlpeFixturesModule { }
