import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TransactionRequest, TransactionType } from '../../../../core/models/wallet.models';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  @Input() loading = false;
  @Output() submitTransaction = new EventEmitter<TransactionRequest>();
  transactionForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01), Validators.max(9999999)]],
      type: [<TransactionType>'Deposit', Validators.required],
      description: ['', Validators.required]
    });

    this.transactionForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const request: TransactionRequest = this.transactionForm.value;
    this.loading = true;
    this.submitTransaction.emit(request);
    this.transactionForm.patchValue({ amount: null, description: '' });
  }
}
