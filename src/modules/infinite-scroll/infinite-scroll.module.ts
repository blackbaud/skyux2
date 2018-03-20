import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyInfiniteScrollComponent } from './infinite-scroll.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
    declarations: [
        SkyInfiniteScrollComponent
    ],
    imports: [
        CommonModule,
        SkyResourcesModule
    ],
    exports: [
        SkyInfiniteScrollComponent
    ]
})
export class SkyInfiniteScrollModule { }
