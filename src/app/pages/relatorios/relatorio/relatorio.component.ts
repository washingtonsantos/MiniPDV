import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../clientes/shared/models/cliente';
import { RelatorioService } from '../shared/services/relatorio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = null;
  resourceForm: FormGroup;

  customSearchFnCliente: string;

  constructor(
    private relatorioService: RelatorioService,
    private fb: FormBuilder) {
      this.buildResourceForm();
   }

  ngOnInit() {}

  public buildResourceForm(): void {
    this.resourceForm = this.fb.group({
      dataInicial: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]],
    });
  }

  gerarRelatorio() {
    this.relatorioService.gerarPDF();
  }

}
