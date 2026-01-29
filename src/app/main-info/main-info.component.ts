import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectTransactionTypes,
  selectTransactions,
} from '../store/transactions.selectors';
import { loadTransactions } from '../store/transactions.actions';

@Component({
  selector: 'app-main-info',
  imports: [RouterLink],
  templateUrl: './main-info.component.html',
  styleUrl: './main-info.component.scss',
})
export class MainInfoComponent {
  private store = inject(Store);

  transactions = toSignal(this.store.select(selectTransactions), {
    initialValue: [],
  });

  transactionTypes = toSignal(this.store.select(selectTransactionTypes), {
    initialValue: [],
  });

  ngOnInit() {
    this.store.dispatch(loadTransactions());
  }

  countOfTransactions(transactionType: string) {
    return this.transactions()?.filter((t) => t.type === transactionType)
      .length;
  }
}
