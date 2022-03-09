import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Injectable({
  providedIn: 'root',
})
export class DataGuard implements CanActivate {
  constructor(
    private readonly dataService: DataService,
    private readonly router: Router
  ) {}
  canActivate(): boolean | UrlTree {
    return this.dataService.selectedCurrencies
      ? true
      : this.router.createUrlTree(['accommodations']);
  }
}
