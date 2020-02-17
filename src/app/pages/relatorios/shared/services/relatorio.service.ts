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

  ngOnInit() {
    this.pedidocabecaService.getAll().subscribe(s => {
      this.pedidocabeca = s;
    });
  }

  gerarPDF() {

    let info = this.pedidocabeca;

    let documento = new jsPDF();
    documento.setFont("Courier");
    documento.setFontStyle("bold");
    documento.setFontSize(20);
    documento.text("Ficha do produto", 65, 15);

    documento.setFillColor(50, 50, 50);

    documento.rect(10, 20, 30, 8);
    documento.rect(10, 28, 30, 8);
    documento.rect(10, 36, 30, 8);
    documento.rect(40, 20, 160, 8);
    documento.rect(40, 28, 160, 8);
    documento.rect(40, 36, 160, 8);

    documento.setFontSize(12);
    documento.setTextColor(105, 105, 105);
    documento.text("Código", 12, 25);
    documento.text("Nome", 12, 33);
    documento.text("Preço", 12, 41);

    documento.setFontStyle("normal");
    documento.setTextColor(0, 0, 0);
    documento.text("001", 42, 25);
    documento.text("Notebook 14' i7 8GB 1TB", 42, 33);
    documento.text("R$ 2400,00", 42, 41);

    documento.output("dataurlnewwindow");
  }

}
