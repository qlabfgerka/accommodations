import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AccommodationsDTO } from 'src/app/models/accommodations/accommodations.model';
import { RateDTO } from 'src/app/models/currencies/rate.model';
import { AccommodationsService } from 'src/app/services/accommodations/accommodations.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss'],
})
export class AccommodationsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public selectedCurrencies!: Array<RateDTO>;
  public accommodations!: Array<AccommodationsDTO>;
  public isLoading!: boolean;
  public dataSource!: MatTableDataSource<AccommodationsDTO>;

  public expanded: boolean = false;
  public displayedColumns: string[] = [
    'name',
    'price',
    'address',
    'city',
    'country',
  ];

  constructor(
    private readonly accommodationsService: AccommodationsService,
    private readonly dataService: DataService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.refresh();
  }

  public openAccommodation(accommodation: AccommodationsDTO): void {
    this.dataService.accommodation = accommodation;
    this.router.navigate([`/accommodations/${accommodation.id}`]);
  }

  public expandTable(): void {
    this.expanded = !this.expanded;
  }

  public handleCurrencies(selectedCurrencies: Array<RateDTO>): void {
    this.dataService.selectedCurrencies = selectedCurrencies;
    this.selectedCurrencies = selectedCurrencies;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public sortData(sort: Sort) {
    const data = this.accommodations.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name as string, b.name as string, isAsc);
        case 'price':
          return this.compare(+a.priceInEur!, +b.priceInEur!, isAsc);
        case 'address':
          return this.compare(a.address as string, b.address as string, isAsc);
        case 'city':
          return this.compare(a.city as string, b.city as string, isAsc);
        case 'country':
          return this.compare(a.country as string, b.country as string, isAsc);
        default:
          return 0;
      }
    });
  }

  private refresh(): void {
    this.isLoading = true;
    this.accommodationsService
      .getAccommodations()
      .pipe(take(1))
      .subscribe((accommodations: Array<AccommodationsDTO>) => {
        this.accommodations = accommodations;
        this.initTable();
        this.isLoading = false;
      });
  }

  private initTable(): void {
    this.dataSource = new MatTableDataSource(this.accommodations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private compare(
    a: number | string,
    b: number | string,
    isAsc: boolean
  ): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
