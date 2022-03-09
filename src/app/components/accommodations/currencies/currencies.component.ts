import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { CurrenciesService } from 'src/app/services/accommodations/currencies.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit {
  @Output() selectedCurrenciesEvent = new EventEmitter<Array<string>>();

  public isLoading!: boolean;
  public currencies!: Array<string>;
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
      .valueChanges.subscribe((selectedCurrencies: Array<string>) => {
        this.selectedCurrenciesEvent.emit(selectedCurrencies);
      });
  }

  private refresh(): void {
    this.isLoading = true;
    this.currenciesService
      .getCurrencies()
      .pipe(take(1))
      .subscribe((currencies: any) => {
        this.currencies = Object.keys(currencies.rates);
        this.isLoading = false;
      });
  }
}
