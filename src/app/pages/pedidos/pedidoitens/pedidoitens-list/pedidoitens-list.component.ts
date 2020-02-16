import { Component, OnInit } from '@angular/core';

import { Pedidoitens } from '../shared/models/pedidoitens';
import { PedidoitensService } from '../shared/services/pedidoitens.service';

@Component({
  selector: 'app-pedidoitens-list',
  templateUrl: './pedidoitens-list.component.html',
  styleUrls: ['./pedidoitens-list.component.css']
})
export class PedidoitensListComponent implements OnInit {

  pedidoItens: Pedidoitens [] = [];

  constructor(private pedidoItensService: PedidoitensService) { }

  ngOnInit() {
    this.pedidoItensService.getAll().subscribe(ped => {
      ped => this.pedidoItens = ped.sort((a, b) => a.id - b.id)
    });
  }

}
