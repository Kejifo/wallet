import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletComponent } from './features/wallet/wallet.component';
import { BalanceCardComponent } from './features/wallet/components/balance-card/balance-card.component';
import { TransactionFormComponent } from './features/wallet/components/transaction-form/transaction-form.component';
import { TransactionHistoryComponent } from './features/wallet/components/transaction-history/transaction-history.component';
import { HttpConfigInterceptor } from './core/interceptors/http-config.interceptor';
import { TxClassPipe, TxLabelPipe, TxSignPipe } from './shared/transaction.pipes';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    BalanceCardComponent,
    TransactionFormComponent,
    TransactionHistoryComponent,
    TxLabelPipe,
    TxClassPipe,
    TxSignPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
