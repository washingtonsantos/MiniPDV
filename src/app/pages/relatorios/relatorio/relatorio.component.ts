import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Cliente } from '../../clientes/shared/models/cliente';
import { RelatorioService } from '../shared/services/relatorio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendedor } from '../../vendedores/shared/models/vendedor';
import { VendedorService } from '../../vendedores/shared/services/vendedor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = null;
  resourceForm: FormGroup;
  vendedores: Vendedor[] = [];
  vendedor: Vendedor;
  customSearchFnCliente: string;

  constructor(
    private relatorioService: RelatorioService,
    private vendedorService: VendedorService,
    private messageService: MessageService,
    private fb: FormBuilder) {
    this.buildResourceForm();
    this.getVendedores();
  }

  ngOnInit() { }

  public buildResourceForm(): void {
    this.resourceForm = this.fb.group({
      dataInicial: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]],
      vendedor: [null]
    });
  }

  gerarRelatorio() {
<<<<<<< HEAD
    const dtInicial = this.resourceForm.get('dataInicial').value;
    const dtFinal = this.resourceForm.get('dataFinal').value;
    const idVendedor = this.resourceForm.get('vendedor').value;
    const gerou = this.relatorioService.gerarRelatorio(idVendedor, dtInicial.moment(), dtFinal.moment());
=======
    const dtInicial = moment(this.resourceForm.get('dataInicial').value, 'YYYY-MM-DD').toDate();
    const dtFinal = moment(this.resourceForm.get('dataFinal').value, 'YYYY-MM-DD').toDate();

    if (dtFinal < dtInicial) {
      this.messageService.add({severity: 'warn', summary: 'Data final deve ser maior ou igual a data inicial!'});
       return;
    }

    const idVendedor = this.resourceForm.get('vendedor').value;
    this.relatorioService.gerarRelatorio(idVendedor, dtInicial, dtFinal);
>>>>>>> df50d283e430f3afd0e7df6cf8cfefec40404649
  }

  getVendedores() {
    this.vendedorService.getAll().subscribe(vend => {
      vend = this.vendedores = vend;
    });
  }

}
