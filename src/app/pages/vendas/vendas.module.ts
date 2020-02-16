import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendasRoutingModule } from './vendas-routing.module';
import { PedidoitensListComponent } from '../pedidos/pedidoitens/pedidoitens-list/pedidoitens-list.component';
import { FiltroArrayPipe } from 'src/app/pipes/filtroarray/filtro-array.pipe';

@NgModule({
  declarations: [VendaFormComponent, PedidoitensListComponent, FiltroArrayPipe],
  imports: [
    NgSelectModule,
    SharedModule,
    VendasRoutingModule,
  ],
})
export class VendasModule { }
