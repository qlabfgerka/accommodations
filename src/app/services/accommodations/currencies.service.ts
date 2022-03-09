import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly hostname: string = 'https://api.exchangerate-api.com/v4/';

  constructor(private readonly httpClient: HttpClient) {}

  public getCurrencies(): Observable<any> {
    return this.httpClient.get<any>(`${this.hostname}/latest/EUR`);
  }
}
