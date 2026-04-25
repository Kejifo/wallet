import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Transaction, TransactionRequest, WalletBalance } from '../models/wallet.models';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private apiUrl = environment.apiUrl || '';

  constructor(private http: HttpClient) {}

  getBalance(): Observable<ApiResponse<WalletBalance>> {
    return this.http.get<ApiResponse<WalletBalance>>(`${this.apiUrl}/api/wallet/balance`).pipe(
      catchError(this.handleError)
    );
  }

  addTransaction(request: TransactionRequest): Observable<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>(`${this.apiUrl}/api/wallet/transaction`, request).pipe(
      catchError(this.handleError)
    );
  }

  getTransactions(): Observable<ApiResponse<Transaction[]>> {
    return this.http.get<ApiResponse<Transaction[]>>(`${this.apiUrl}/api/wallet/transactions`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const backendMessage = error.error?.message;
    const message = typeof backendMessage === 'string' && backendMessage
      ? backendMessage
      : 'Error inesperado del servidor';
    return throwError(() => message);
  }
}
