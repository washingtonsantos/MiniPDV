import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Cliente extends BaseResourceModel {
  constructor(
     public id?: number,
     public nome?: string,
     public status?: boolean,
     public credito?: number,
  ){
    super();
  }

  static fromJson(jsonData: any): Cliente {
    return Object.assign(new Cliente(), jsonData);
 }

}
