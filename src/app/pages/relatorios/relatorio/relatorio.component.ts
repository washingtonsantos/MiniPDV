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
  vendedor: Vendedor = null;
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
      vendedor: [this.vendedor]
    });
  }

  async gerarRelatorio() {
    return await this.relatorioService.gerarPDF(this.resourceForm.get('vendedor').value);
  }

  getVendedores() {
    this.vendedorService.getAll().subscribe(vend => {
      vend = this.vendedores = vend
    });
  }

  async gerarRelatorioVendas() {
    let gerou = this.gerarRelatorio();

    if (gerou) {
      alert('Nenhum registro encontrado!')
    }
  }

}
