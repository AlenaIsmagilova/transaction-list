import { createReducer, on } from '@ngrx/store';
import * as TransactionsActions from './transactions.actions';
import { ITransaction } from '../services/transactions.service';

export interface ITransactionsState {
  transactions: ITransaction[];
  transactionTypes: string[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialState: ITransactionsState = {
  transactions: [],
  transactionTypes: [],
  loading: false,
  loaded: false,
  error: null,
};

export const transactionsReducer = createReducer(
  initialState,

  on(TransactionsActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    TransactionsActions.setTransactionTypes,
    (state, { transactionTypes }) => ({
      ...state,
      transactionTypes,
    })
  ),

  on(
    TransactionsActions.loadTransactionsSuccess,
    (state, { transactions }) => ({
      ...state,
      transactions,
      loading: false,
      loaded: true,
      error: null,
    })
  ),

  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionsActions.clearTransactions, () => initialState)
);
