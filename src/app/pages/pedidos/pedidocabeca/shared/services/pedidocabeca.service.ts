import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Pedidocabeca } from './../models/pedidocabeca';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PedidocabecaService extends BaseResourceService<Pedidocabeca> {
  constructor(protected injector: Injector) {
    super('api/clientes', injector, Pedidocabeca.fromJson)
  }

}
