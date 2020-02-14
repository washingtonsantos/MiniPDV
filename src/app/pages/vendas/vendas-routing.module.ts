import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendaFormComponent } from './venda-form/venda-form.component';

const routes: Routes = [
  { path: '', component: VendaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
