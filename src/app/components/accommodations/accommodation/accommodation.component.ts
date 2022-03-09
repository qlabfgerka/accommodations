import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mergeMap, take } from 'rxjs';
import { AccommodationsDTO } from 'src/app/models/accommodations/accommodations.model';
import { RateDTO } from 'src/app/models/currencies/rate.model';
import { AccommodationsService } from 'src/app/services/accommodations/accommodations.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.scss'],
})
export class AccommodationComponent implements OnInit {
  public accommodation!: AccommodationsDTO;
  public selectedCurrencies!: Array<RateDTO>;

  constructor(
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
    private readonly accommodationsService: AccommodationsService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  public calculateRate(n1: number, n2: number): number {
    return n1 * n2;
  }

  private refresh(): void {
    this.accommodation = this.dataService.accommodation;
    this.selectedCurrencies = this.dataService.selectedCurrencies;

    if (!this.accommodation) this.refreshAccommodation();
  }

  private refreshAccommodation(): void {
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap: ParamMap) =>
          this.accommodationsService.getAccommodation(paramMap.get('id')!)
        )
      )
      .subscribe(
        (accommodation: AccommodationsDTO) =>
          (this.accommodation = accommodation)
      );
  }
}
