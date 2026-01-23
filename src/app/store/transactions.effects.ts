import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as TransactionsActions from './transactions.actions';
import { TransactionsService } from '../services/transactions.service';
import { selectLoaded } from './transactions.selectors';

@Injectable()
export class TransactionsEffects {
  private actions$ = inject(Actions);
  private http = inject(TransactionsService);
  private store = inject(Store);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),

      withLatestFrom(this.store.select(selectLoaded)),

      filter(([_, loaded]) => !loaded),

      mergeMap(() =>
        this.http.getTransactions().pipe(
          mergeMap((transactions) => [
            TransactionsActions.loadTransactionsSuccess({ transactions }),
            TransactionsActions.setTransactionTypes({
              transactionTypes: [...new Set(transactions.map((t) => t.type))],
            }),
          ]),
          catchError((err) =>
            of(
              TransactionsActions.loadTransactionsFailure({
                error: err?.message ?? 'Error',
              })
            )
          )
        )
      )
    )
  );
}
