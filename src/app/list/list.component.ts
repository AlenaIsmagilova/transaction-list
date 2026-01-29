import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import * as TransactionsActions from '../store/transactions.actions';
import {
  selectError,
  selectLoading,
  selectTransactionTypes,
  selectTransactions,
} from '../store/transactions.selectors';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  transactions = toSignal(this.store.select(selectTransactions), {
    initialValue: [],
  });

  transactionTypes = toSignal(this.store.select(selectTransactionTypes), {
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

  selectedType = toSignal(
    this.route.queryParams.pipe(map((param) => param['type']))
  );

  filteredTransactions() {
    return this.selectedType()
      ? this.transactions()?.filter((t) => t.type === this.selectedType())
      : this.transactions();
  }
}
