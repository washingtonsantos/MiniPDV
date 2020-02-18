import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

import { Produto } from 'src/app/pages/produtos/shared/models/produto.model';

export class Pedidoitens extends BaseResourceModel {
  constructor(
    public id?: number,
    public idPedido?: number,
    public produto?: Produto,
    public quantidade?: number,
    public precoUnitario?: number,
    public desconto?: number,
    public valorTotal?: number,
  ) {
    super();
  }

  static fromJson(jsonData: any): Pedidoitens {
    return Object.assign(new Pedidoitens(), jsonData);
  }

}
