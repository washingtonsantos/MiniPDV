import { BaseResourceModel } from 'src/app/shared/models/base-resource.model'
import { Cliente } from 'src/app/pages/clientes/shared/models/cliente'
import { Vendedor } from 'src/app/pages/vendedores/shared/models/vendedor'

export class Pedidocabeca extends BaseResourceModel {
  constructor(
    public id?: number,
    public cliente?: Cliente,
    public vendedor?: Vendedor,
    public data?: Date,
    public total?: number,
  ) {
    super();
  }

  static fromJson(jsonData: any): Pedidocabeca {
    return Object.assign(new Pedidocabeca(), jsonData);
  }

}
