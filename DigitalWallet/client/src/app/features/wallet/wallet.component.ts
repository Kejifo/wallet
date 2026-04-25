import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionRequest, WalletBalance } from '../../core/models/wallet.models';
import { WalletService } from '../../core/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy {
  wallet?: WalletBalance;
  balanceLoading = false;
  transactionLoading = false;
  errorMessage = '';
  successMessage = '';
  private destroy$ = new Subject<void>();

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.loadBalance();
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBalance(): void {
    this.balanceLoading = true;
    this.walletService.getBalance()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.wallet = response.data;
          this.balanceLoading = false;
        },
        error: error => {
          this.errorMessage = error;
          this.balanceLoading = false;
        }
      });
  }

  loadTransactions(): void {
    this.transactionLoading = true;
    this.walletService.getTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (!this.wallet) {
            this.wallet = { currentBalance: 0, lastUpdate: new Date().toISOString(), transactions: [] };
          }
          this.wallet.transactions = response.data;
          this.transactionLoading = false;
        },
        error: error => {
          this.errorMessage = error;
          this.transactionLoading = false;
        }
      });
  }

  handleTransaction(request: TransactionRequest): void {
    this.transactionLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.walletService.addTransaction(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.successMessage = response.message;
          this.loadBalance();
          this.loadTransactions();
          this.transactionLoading = false;
        },
        error: error => {
          this.errorMessage = error;
          this.transactionLoading = false;
        }
      });
  }
}
