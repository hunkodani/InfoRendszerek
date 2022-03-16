import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Transaction } from '../Models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  async loadTransactions() {
    return lastValueFrom(this.http.get<Transaction[]>('/api/transactions'));
  }

  async loadTransactionsByResidentId(id: number) {
    return lastValueFrom(this.http.get<Transaction[]>('/api/transaction', {
      params: {search: id}
    }));
  }

  async createTransaction(transaction: Transaction) {
    return lastValueFrom(this.http.post<Transaction>('/api/transactions', transaction));
  }
}
