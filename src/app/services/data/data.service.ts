import { Injectable } from '@angular/core';
import { AccommodationsDTO } from 'src/app/models/accommodations/accommodations.model';
import { RateDTO } from 'src/app/models/currencies/rate.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public selectedCurrencies!: Array<RateDTO>;
  public accommodation!: AccommodationsDTO;

  constructor() {}
}
