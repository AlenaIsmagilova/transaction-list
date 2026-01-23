import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITransactionsState } from './transactions.reducers';

export const selectTransactionsState =
  createFeatureSelector<ITransactionsState>('transactions');

export const selectTransactions = createSelector(
  selectTransactionsState,
  (state) => state.transactions
);

export const selectLoaded = createSelector(
  selectTransactionsState,
  (state) => state.loaded
);

export const selectLoading = createSelector(
  selectTransactionsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTransactionsState,
  (state) => state.error
);
