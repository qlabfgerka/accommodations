import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationsDTO } from 'src/app/models/accommodations/accommodations.model';

@Injectable({
  providedIn: 'root',
})
export class AccommodationsService {
  private readonly hostname: string =
    'https://5ddbbbd5041ac10014de14d7.mockapi.io';

  constructor(private readonly httpClient: HttpClient) {}

  public getAccommodations(): Observable<Array<AccommodationsDTO>> {
    return this.httpClient.get<Array<AccommodationsDTO>>(
      `${this.hostname}/accommodations/prices`
    );
  }
}
