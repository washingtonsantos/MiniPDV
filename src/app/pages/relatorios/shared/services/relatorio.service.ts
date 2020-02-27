import { Vendedor } from 'src/app/pages/vendedores/shared/models/vendedor';
import { Pedidocabeca } from './../../../pedidos/pedidocabeca/shared/models/pedidocabeca';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { timer } from 'rxjs';

import { PedidocabecaService } from 'src/app/pages/pedidos/pedidocabeca/shared/services/pedidocabeca.service';
import { VendedorService } from 'src/app/pages/vendedores/shared/services/vendedor.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(
    private pedidocabecaService: PedidocabecaService,
    private vendedorService: VendedorService) { }

  pedidocabeca: Pedidocabeca[] = [];

  async gerarPDF(vendedor: Vendedor): Promise<Boolean> {

    this.pedidocabecaService.getAll().subscribe(s => {
      this.pedidocabeca = s;

      let linha = 33;
      let documento = new jsPDF();
      let total = 0;
      let numPag = 0;

      this.pedidocabeca.forEach(pedido => {

        if (pedido.cliente && pedido.vendedor) {

          this.montaCabecalho(documento);
          this.addLinhaTable(documento, linha, false);

          let dateObj = new Date(pedido.data)
          let dateString = dateObj.toLocaleString('pt', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })

          documento.setFontStyle("normal");
          documento.setTextColor(0, 0, 0);
          documento.text(dateString, 12, linha);
          documento.text(String(pedido.id), 42, linha);
          documento.text(pedido.cliente.nome, 62, linha);
          documento.text(pedido.vendedor.nome, 122, linha);
          total += pedido.total;
          documento.text(String(pedido.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })), 177, linha);
          linha += 8;
        }

        if (linha == 257) {
          this.aguardarGerarPaginaNova();
          numPag += 1;
          this.finalizaPagina(documento, numPag, linha + 16);
        }
      });

      this.addTotalizador(documento, total, linha);
      this.finalizaPagina(documento, numPag, linha);
      return true;
    });

    return false;
  }

  montaCabecalho(documento: jsPDF) {

    documento.setFont("Courier");
    documento.setFontStyle("bold");
    documento.setFontSize(20);
    documento.text("Relatório de Vendas", 65, 15);

    documento.setFillColor(50, 50, 50);
    documento.rect(10, 20, 30, 8);
    documento.rect(40, 20, 20, 8);
    documento.rect(60, 20, 60, 8);
    documento.rect(120, 20, 55, 8);
    documento.rect(175, 20, 25, 8);

    documento.setFontSize(10);
    documento.setFontStyle("bold");
    // documento.setTextColor(105, 105, 105);
    documento.text("Data", 12, 25);
    documento.text("Pedido", 42, 25);
    documento.text("Cliente", 62, 25);
    documento.text("Vendedor", 122, 25);
    documento.text("Total", 177, 25);

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

    if (numPag === 0)
      numPag = 1;

    if (linha === 33) {
      return false;
    }

    documento.text("pág. " + numPag, 185, 290);
    documento.output("dataurlnewwindow");
  }

  aguardarGerarPaginaNova() {
    function sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
      });
    }
  }

  addTotalizador(documento: jsPDF, total: number, linha: number) {
    documento.setFont("Courier");
    documento.setFontStyle("bold");
    documento.text("Total Acumulado:", 122, linha);
    documento.text(total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), 177, linha);

    this.addLinhaTable(documento, linha, true);

  }

}
