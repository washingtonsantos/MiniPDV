import { Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseResourceService<Cliente> {
  constructor(protected injector: Injector) {
    super('api/clientes', injector, Cliente.fromJson)
  }

  public getClientePorIdOuNome(filtro: any): Observable<Cliente> {
    const url = `${this.apiPath}/id=${filtro}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

}
