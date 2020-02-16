import { Injector, Injectable } from '@angular/core';

import { Pedidoitens } from '../models/pedidoitens';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Produto } from 'src/app/pages/produtos/shared/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoitensService extends BaseResourceService<Pedidoitens> {

    pedidoItens: Pedidoitens[] = [];
    produtos: Produto[] = [];

  constructor(protected injector: Injector) {
    super('api/pedidoitens', injector, Pedidoitens.fromJson)
  }
}
