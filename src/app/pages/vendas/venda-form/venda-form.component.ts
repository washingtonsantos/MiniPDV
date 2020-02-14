import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addProduto() {
     alert('Produto adicionado com sucesso!');
  }

}
