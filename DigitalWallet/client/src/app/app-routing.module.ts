import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './features/wallet/wallet.component';

const routes: Routes = [
  { path: '', component: WalletComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
