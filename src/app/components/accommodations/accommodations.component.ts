import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
})
export class AccommodationsComponent implements OnInit {
  public selectedCurrencies!: Array<string>;

  constructor() {}

  ngOnInit(): void {}

  public handleCurrencies(selectedCurrencies: Array<string>): void {
    this.selectedCurrencies = selectedCurrencies;
    console.log(selectedCurrencies);
  }
}
