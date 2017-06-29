import { NgModule } from '@angular/core';
import { SkyNumericPipe } from './numeric.pipe';
import { SkyNumericService } from './numeric.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [SkyNumericPipe],
  providers: [
    SkyNumericService,
    CurrencyPipe,
    DecimalPipe],
  exports: [SkyNumericPipe]
})
export class SkyNumericModule { }
