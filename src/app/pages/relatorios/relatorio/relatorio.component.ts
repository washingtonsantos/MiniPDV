import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Cliente } from '../../clientes/shared/models/cliente';
import { RelatorioService } from '../shared/services/relatorio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendedor } from '../../vendedores/shared/models/vendedor';
import { VendedorService } from '../../vendedores/shared/services/vendedor.service';

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
    const dtInicial = moment(this.resourceForm.get('dataInicial').value, 'YYYY-MM-DD').toDate();
    const dtFinal = moment(this.resourceForm.get('dataFinal').value, 'YYYY-MM-DD').toDate();
    const idVendedor = this.resourceForm.get('vendedor').value;
    this.relatorioService.gerarRelatorio(idVendedor, dtInicial, dtFinal);
  }

  getVendedores() {
    this.vendedorService.getAll().subscribe(vend => {
      vend = this.vendedores = vend;
    });
  }

}
