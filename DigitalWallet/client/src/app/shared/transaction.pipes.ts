import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../core/models/wallet.models';

@Pipe({ name: 'txLabel' })
export class TxLabelPipe implements PipeTransform {
  transform(value: TransactionType): string {
    return value === 'Deposit' ? 'Depósito' : 'Retiro';
  }
}

@Pipe({ name: 'txClass' })
export class TxClassPipe implements PipeTransform {
  transform(value: TransactionType): string {
    return value === 'Deposit' ? 'tx-deposit' : 'tx-withdrawal';
  }
}

@Pipe({ name: 'txSign' })
export class TxSignPipe implements PipeTransform {
  transform(value: TransactionType): string {
    return value === 'Deposit' ? '+' : '-';
  }
}
