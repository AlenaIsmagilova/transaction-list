import { createAction, props } from '@ngrx/store';
import { ITransaction } from '../services/transactions.service';

export const loadTransactions = createAction('[Transactions] Load');

export const setTransactionTypes = createAction(
  '[Transactions] Set Transaction Types',
  props<{ transactionTypes: string[] }>()
);

export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Success',
  props<{ transactions: ITransaction[] }>()
);

export const loadTransactionsFailure = createAction(
  '[Transactions] Load Failure',
  props<{ error: string }>()
);

//TODO сделать кнопку обновить или перезагрузить транзакции для этого(или придумать фильтр, н-р по валюте)
export const clearTransactions = createAction('[Transactions] Clear');
