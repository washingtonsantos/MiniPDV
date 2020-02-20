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
    super('api/pedidocabeca', injector, Pedidocabeca.fromJson)
  }

  criarPedido(resource: Pedidocabeca): Observable<Pedidocabeca> {
    return this.http.post(this.apiPath, resource).pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
    );
}

protected jsonDataToResource(jsonData: any): Pedidocabeca {
  return this.jsonDataToResourceFn(jsonData);
}

}
