import { Injectable, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';

import { Vendedor } from 'src/app/pages/vendedores/shared/models/vendedor';
import { Pedidocabeca } from './../../../pedidos/pedidocabeca/shared/models/pedidocabeca';
import { PedidocabecaService } from 'src/app/pages/pedidos/pedidocabeca/shared/services/pedidocabeca.service';
import { VendedorService } from 'src/app/pages/vendedores/shared/services/vendedor.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  pedidos: Pedidocabeca[];
  pedidos$: Observable<Pedidocabeca[]>;

  constructor(
    private pedidocabecaService: PedidocabecaService,
  ) { }

  gerarRelatorio(vendedorId: number, dtInicio: Date, dtFim: Date) {

    const idVendedor = vendedorId;
    moment.locale('pt-BR');

    if (idVendedor === null || String(idVendedor) === 'Todos') {
      this.pedidocabecaService.getAll().subscribe(response => {
        if (response) {
           this.pedidos = response;
           this.gerarPDF();
        }
      });
    } else if (idVendedor >= 1) {
      this.pedidocabecaService.getAll().subscribe(response => {
        if (response) {
           this.pedidos = response.filter((f) => f.vendedor.id === Number(idVendedor)
           && (moment.utc(f.data, 'YYYY-MM-DD', 'pt').toDate() >= moment(dtInicio, 'YYYY-MM-DD', 'pt').toDate()
           &&  moment.utc(f.data, 'YYYY-MM-DD', 'pt').toDate() <= moment(dtFim, 'YYYY-MM-DD', 'pt').toDate()));
           this.gerarPDF();
        }
      });
    }
  }

  gerarPDF(): boolean {

    let linha = 33;
    const documento = new jsPDF();
    let total = 0;
    let numPag = 0;

    if (this.pedidos.length === 0) {
      alert('Não foi encontrado nenhuma Venda!');
      return false;
     }

    this.montaCabecalho(documento);

    this.pedidos.forEach(pedido => {

      if (pedido.cliente && pedido.vendedor) {
        this.addLinhaTable(documento, linha, false);
        const dateObj = new Date(pedido.data);
        const dateString = dateObj.toLocaleString('pt', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        documento.setFontStyle('normal');
        documento.setTextColor(0, 0, 0);
        documento.text(dateString, 12, linha);
        documento.text(String(pedido.id), 42, linha);
        documento.text(pedido.cliente.nome, 62, linha);
        documento.text(pedido.vendedor.nome, 122, linha);
        total += pedido.total;
        documento.text(String(pedido.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })), 177, linha);
        linha += 8;
      }

      if (linha === 257) {
        this.aguardarGerarPaginaNova();
        numPag += 1;
        this.finalizaPagina(documento, numPag, linha + 16);
      }
    });

    this.addTotalizador(documento, total, linha);
    this.finalizaPagina(documento, numPag, linha);
    return true;
  }

  montaCabecalho(documento: jsPDF) {

    documento.setFont('Courier');
    documento.setFontStyle('bold');
    documento.setFontSize(20);
    documento.text('Relatório de Vendas', 65, 15);

    documento.setFillColor(50, 50, 50);
    documento.rect(10, 20, 30, 8);
    documento.rect(40, 20, 20, 8);
    documento.rect(60, 20, 60, 8);
    documento.rect(120, 20, 55, 8);
    documento.rect(175, 20, 25, 8);

    documento.setFontSize(10);
    documento.setFontStyle('bold');
    documento.text('Data', 12, 25);
    documento.text('Pedido', 42, 25);
    documento.text('Cliente', 62, 25);
    documento.text('Vendedor', 122, 25);
    documento.text('Total', 177, 25);

  }

  addLinhaTable(documento: jsPDF, linha: number, isTotalizador: boolean) {
    linha -= 5;
    documento.setFillColor(50, 50, 50);

    if (!isTotalizador) {
      documento.rect(10, linha, 30, 8);
      documento.rect(40, linha, 20, 8);
      documento.rect(60, linha, 60, 8);
    }
    documento.rect(120, linha, 55, 8);
    documento.rect(175, linha, 25, 8);
    documento.setFontSize(8);
    documento.setTextColor(105, 105, 105);
  }

  finalizaPagina(documento: jsPDF, numPag: number, linha: number) {

    if (numPag === 0) {
      numPag = 1;
    }

    documento.text('pág. ' + numPag, 185, 290);
    documento.output('dataurlnewwindow');
  }

  aguardarGerarPaginaNova() {
    function sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
      });
    }
  }

  addTotalizador(documento: jsPDF, total: number, linha: number) {
    documento.setFont('Courier');
    documento.setFontStyle('bold');
    documento.text('Total Acumulado:', 122, linha);
    documento.text(total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), 177, linha);

    this.addLinhaTable(documento, linha, true);

  }

}
