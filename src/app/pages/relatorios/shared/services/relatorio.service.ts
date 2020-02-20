import { Pedidocabeca } from './../../../pedidos/pedidocabeca/shared/models/pedidocabeca';
import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';

import { PedidocabecaService } from 'src/app/pages/pedidos/pedidocabeca/shared/services/pedidocabeca.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private pedidocabecaService: PedidocabecaService) { }

  pedidocabeca: Pedidocabeca[] = [];

  gerarPDF() {

    this.pedidocabecaService.getAll().subscribe(s => {
      this.pedidocabeca = s;

      let linha = 33;
      let documento = new jsPDF();

      this.pedidocabeca.forEach(pedido => {

        if (pedido.cliente && pedido.vendedor) {

          documento.setFont("Courier");
          documento.setFontStyle("bold");
          documento.setFontSize(20);
          documento.text("Relatório de Vendas", 65, 15);

          documento.setFillColor(50, 50, 50);

          documento.rect(10, 20, 30, 8);
          documento.rect(10, 28, 30, 8);
          documento.rect(10, 36, 30, 8);

          documento.rect(40, 20, 160, 8);
          documento.rect(40, 28, 160, 8);
          documento.rect(40, 36, 160, 8);

          documento.rect(60, 20, 30, 8);
          documento.rect(60, 28, 30, 8);
          documento.rect(60, 36, 30, 8);

          documento.rect(155, 20, 0, 8);
          documento.rect(155, 28, 0, 8);
          documento.rect(155, 36, 0, 8);

          documento.setFontSize(12);
          documento.setTextColor(105, 105, 105);
          documento.text("Data", 15, 25);
          documento.text("Pedido", 42, 25);
          documento.text("Cliente", 65, 25);
          documento.text("Vendedor", 110, 25);
          documento.text("Total", 170, 25);

          // documento.text("Nome", 12, 33);
          // documento.text("Preço", 12, 41);
          documento.setFontStyle("normal");
          documento.setTextColor(0, 0, 0);
          documento.text("20/02/2020", 12, linha);
          documento.text("000001", 42, linha);
          documento.text(pedido.cliente.nome, 62, linha);
          documento.text(pedido.vendedor.nome, 93, linha);
          documento.text("R$ 1078,22", 160, linha);

          linha += 8;
        }
      });

      documento.output("dataurlnewwindow");

    });
  }
}
