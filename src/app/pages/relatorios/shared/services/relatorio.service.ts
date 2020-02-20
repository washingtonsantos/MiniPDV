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
      let total = 0;

      this.pedidocabeca.forEach(pedido => {

        if (pedido.cliente && pedido.vendedor) {

          documento.setFont("Courier");
          documento.setFontStyle("bold");
          documento.setFontSize(20);
          documento.text("Relatório de Vendas", 65, 15);

          documento.setFillColor(50, 50, 50);

          documento.rect(10, 20, 30, 8);
          documento.rect(40, 20, 160, 8);
          documento.rect(60, 20, 60, 8);

          documento.setFontSize(12);
          documento.setTextColor(105, 105, 105);
          documento.text("Data", 15, 25);
          documento.text("Pedido", 42, 25);
          documento.text("Cliente", 65, 25);
          documento.text("Vendedor", 140, 25);
          documento.text("Total", 185, 25);

          // documento.text("Nome", 12, 33);
          // documento.text("Preço", 12, 41);
          documento.setFontStyle("normal");
          documento.setTextColor(0, 0, 0);
          let dateObj = new Date(pedido.data)
          let dateString = dateObj.toLocaleString('pt', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit'
          }).replace(/\//g, '-')

          documento.text(dateString, 12, linha);
          documento.text(String(pedido.id), 42, linha);
          documento.text(pedido.cliente.nome, 62, linha);
          documento.text(pedido.vendedor.nome, 125, linha);
          total += pedido.total;
          documento.text(String(pedido.total), 185, linha);

          linha += 8;
        }
      });

      documento.setFont("Courier");
      documento.setFontStyle("bold");
      documento.text("Total Acumulado: R$ ", 120, linha);
      documento.text(String(total), 180, linha);
      linha = 290;
      documento.text("pág. 1", 185, linha);
      documento.output("dataurlnewwindow");

    });
  }
}
