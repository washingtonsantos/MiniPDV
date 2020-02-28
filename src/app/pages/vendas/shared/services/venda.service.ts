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

  //   gravarPedido(resource: Pedidocabeca): Observable<Pedidocabeca> {
  //     return this.http.post(this.apiPath, resource).pipe(
  //       map(this.jsonDataToResource.bind(this)),
  //       catchError(this.handleError)
  //     )
  //   }

  //    // PROTECTED METHODS
  // protected jsonDataToResources(jsonData: any[]): Pedidocabeca[] {
  //   const resources: Pedidocabeca[] = [];
  //   jsonData.forEach(
  //     element => resources.push(this.jsonDataToResourceFn(element))
  //   );
  //   return resources;
  // }

  // protected jsonDataToResource(jsonData: any): Pedidocabeca {
  //   return this.jsonDataToResourceFn(jsonData);
  // }

  // protected handleError(error: any): Observable<any> {
  //   console.log('ERRO NA REQUISIÇÃO => ', error);
  //   return throwError(error);
  // }
}
