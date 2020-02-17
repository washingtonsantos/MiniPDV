import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../clientes/shared/models/cliente';
import { RelatorioService } from '../shared/services/relatorio.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = null;

  customSearchFnCliente: string;

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit() {
  }

  gerarRelatorio() {
    this.relatorioService.gerarPDF();
  }

}
