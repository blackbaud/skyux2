import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {AppModule} from './app.component';
import {Tile1Component} from './tile1.component';
import {Tile2Component} from './tile2.component';

import {SkyModule} from 'skyux/core';



platformBrowserDynamic().bootstrapModule(AppModule);
