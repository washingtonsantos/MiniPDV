import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendasRoutingModule } from './vendas-routing.module';

@NgModule({
  declarations: [VendaFormComponent],
  imports: [
    SharedModule,
    VendasRoutingModule
  ],
})
export class VendasModule { }
