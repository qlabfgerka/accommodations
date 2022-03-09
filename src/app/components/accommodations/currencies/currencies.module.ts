import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';

@NgModule({
  declarations: [CurrenciesComponent],
  imports: [CommonModule, CurrenciesRoutingModule],
  exports: [CurrenciesComponent],
})
export class CurrenciesModule {}
