import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SkyValidationModule } from '../';
import { UrlValidationTestComponent } from './url-validation.component.fixture';

@NgModule({
    declarations: [
        UrlValidationTestComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        SkyValidationModule
    ],
    exports: [
        UrlValidationTestComponent
    ]
})
export class SkyUrlValidationFixturesModule { }
