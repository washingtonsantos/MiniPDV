import { Component, OnInit } from '@angular/core';

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
    const dtInicial = this.resourceForm.get('dataInicial').value;
    const dtFinal = this.resourceForm.get('dataFinal').value;
    const idVendedor = this.resourceForm.get('vendedor').value;
    const gerou = this.relatorioService.gerarRelatorio(idVendedor, dtInicial.moment(), dtFinal.moment());
  }

  getVendedores() {
    this.vendedorService.getAll().subscribe(vend => {
      vend = this.vendedores = vend;
    });
  }

}
