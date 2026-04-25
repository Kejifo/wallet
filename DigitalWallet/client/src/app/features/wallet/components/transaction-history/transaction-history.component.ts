import { Component, Input } from '@angular/core';
import { Transaction } from '../../../../core/models/wallet.models';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent {
  @Input() transactions: Transaction[] = [];
  @Input() loading = false;
}
