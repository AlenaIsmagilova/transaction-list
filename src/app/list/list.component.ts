import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import * as TransactionsActions from '../store/transactions.actions';
import {
  selectError,
  selectLoading,
  selectTransactions,
} from '../store/transactions.selectors';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private store = inject(Store);

  transactions = toSignal(this.store.select(selectTransactions), {
    initialValue: [],
  });

  loading = toSignal(this.store.select(selectLoading), {
    initialValue: false,
  });

  error = toSignal(this.store.select(selectError), {
    initialValue: null,
  });

  ngOnInit() {
    this.store.dispatch(TransactionsActions.loadTransactions());
  }
}
