import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { RateDTO } from 'src/app/models/currencies/rate.model';
import { CurrenciesService } from 'src/app/services/accommodations/currencies.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  @Output() selectedCurrenciesEvent = new EventEmitter<Array<RateDTO>>();

  public isLoading!: boolean;
  public currencies!: Array<RateDTO>;
  public currenciesForm!: FormGroup;

  constructor(
    private readonly currenciesService: CurrenciesService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.refresh();
  }

  private initForm(): void {
    this.currenciesForm = this.formBuilder.group({
      currencies: ['', [Validators.required]],
    });

    this.listenToChanges();
  }

  private listenToChanges(): void {
    this.currenciesForm
      .get('currencies')!
      .valueChanges.subscribe((selectedCurrencies: Array<RateDTO>) => {
        this.selectedCurrenciesEvent.emit(selectedCurrencies);
      });
  }

  private refresh(): void {
    this.isLoading = true;
    this.currenciesService
      .getCurrencies()
      .pipe(take(1))
      .subscribe((currencies: any) => {
        this.currencies = new Array<RateDTO>();
        for (const key in currencies.rates) {
          let rate: RateDTO = new RateDTO();
          rate.currency = key;
          rate.value = currencies.rates[key];
          this.currencies.push(rate);
        }
        this.isLoading = false;
      });
  }
}
