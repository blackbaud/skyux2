import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyInfiniteScrollModule } from '../';
import { InfiniteScrollTestComponent } from './infinite-scroll.component.fixture';

@NgModule({
    declarations: [
        InfiniteScrollTestComponent
    ],
    imports: [
        CommonModule,
        SkyInfiniteScrollModule
    ],
    exports: [
        InfiniteScrollTestComponent
    ]
})
export class SkyInfiniteScrollFixturesModule { }
