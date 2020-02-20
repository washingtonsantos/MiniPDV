import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { BaseResourceService } from './base-resource.service';
import { BaseResourceModel } from '../models/base-resource.model';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmationServiceService<T extends BaseResourceModel> {
resource: T[] = [];
  constructor(protected confirmationService: ConfirmationService,
    protected resourceService: BaseResourceService<T>
  ) { }

  excluir(id: number): void {

    this.confirmationService.confirm({
      message: 'Deseja cancelar o item?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',

      accept: () => {
        this.resourceService.delete(id);
        return true;
      },
    });
    return;
  }

}
