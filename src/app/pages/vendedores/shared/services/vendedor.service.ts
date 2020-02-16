import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Vendedor } from '../models/vendedor';

@Injectable({
  providedIn: 'root'
})
export class VendedorService extends BaseResourceService<Vendedor> {
  constructor(protected injector: Injector) {
    super('api/vendedores', injector, Vendedor.fromJson)
  }
}
