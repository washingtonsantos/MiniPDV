import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CustomConfirmationServiceService<T> {

  constructor(protected confirmationService: ConfirmationService,
  ) { }

  async excluir(id: number): Promise<Boolean> {

    this.confirmationService.confirm({
      message: 'Deseja cancelar o item?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',

      accept: () => {
        return true;
      },
    });
    return;
  }

}
