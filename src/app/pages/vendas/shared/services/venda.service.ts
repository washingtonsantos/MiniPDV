import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Pedidocabeca } from 'src/app/pages/pedidos/pedidocabeca/shared/models/pedidocabeca';
import { PedidocabecaService } from 'src/app/pages/pedidos/pedidocabeca/shared/services/pedidocabeca.service';

@Injectable({
  providedIn: 'root'
})
export class VendaService extends BaseResourceService<Pedidocabeca> {

  constructor(protected injector: Injector, private pedidocabecaService: PedidocabecaService) {
    super('api/pedidocabeca', injector, Pedidocabeca.fromJson)
  }
}
