import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationComponent } from './accommodation.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AccommodationComponent],
  imports: [CommonModule, AccommodationRoutingModule, MatCardModule],
})
export class AccommodationModule {}
