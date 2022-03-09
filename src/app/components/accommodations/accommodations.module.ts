import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccommodationsRoutingModule } from './accommodations-routing.module';
import { AccommodationsComponent } from './accommodations.component';
import { CurrenciesModule } from './currencies/currencies.module';

@NgModule({
  declarations: [AccommodationsComponent],
  imports: [CommonModule, AccommodationsRoutingModule, CurrenciesModule],
})
export class AccommodationsModule {}
