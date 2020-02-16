import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Vendedor extends BaseResourceModel {
  constructor(
    public nome?: string,
    public ativo?: boolean,
 ){
   super();
 }

 static fromJson(jsonData: any): Vendedor {
   return Object.assign(new Vendedor(), jsonData);
}
}
