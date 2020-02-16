import { Component, OnInit } from '@angular/core';

import { Produto } from '../../produtos/shared/models/produto.model';
import { ProdutoService } from '../../produtos/shared/services/produto.service';
import { Pedidoitens } from '../../pedidos/pedidoitens/shared/models/pedidoitens';
import { Cliente } from '../../clientes/shared/models/cliente';
import { ClienteService } from '../../clientes/shared/services/cliente.service';
import { Vendedor } from '../../vendedores/shared/models/vendedor';
import { VendedorService } from '../../vendedores/shared/services/vendedor.service';
import { PedidoitensService } from '../../pedidos/pedidoitens/shared/services/pedidoitens.service';
import { FilterPipe } from '../../../pipes/filterpipe/filterpipe.pipe'
import { Pedidocabeca } from '../../pedidos/pedidocabeca/shared/models/pedidocabeca';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

  pedidoItens: Pedidoitens[] = [];
  produtos: Produto[] = [];
  clientes: Cliente[] = [];
  cliente: Cliente = null;
  vendedores: Vendedor[] = [];
  vendedor: Vendedor = null;

  // produtosEncontrados: string;
  searchText: string = '';
  // valorTotal: number;

  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private vendedorService: VendedorService,
    private pedidoItensService: PedidoitensService) {}

  ngOnInit() {
    this.getClientes();
    this.getVendedores();
    this.getProdutos();
  }

  getClientes() {
    this.clienteService.getAll().subscribe(
      clientes => this.clientes = clientes.sort((a, b) => a.id - b.id)
    );
  }

  getVendedores() {
    this.vendedorService.getAll().subscribe(
      vendedores => this.vendedores = vendedores.sort((a, b) => a.id - b.id)
    );
  }

  getProdutos() {
   this.produtoService.getAll().subscribe(
      prod => this.produtos = prod.sort((a,b) => a.id - b.id )
    );
  }

  addProduto(produto: Produto) {
    let pedido = this.pedidoItens.find((existe) => existe.produto.id === produto.id);

    if (this.pedidoItens.length > 0 && pedido)  {
      let qtdATual = Number(pedido.quantidade);
      const qtd = qtdATual += 1;
      pedido.preco = produto.preco * qtd;
      pedido.quantidade = qtd;
    }
    else {
      this.pedidoItens.push(new Pedidoitens(this.pedidoItens.length + 1, 0, produto, 1, produto.preco));
    }
  }

  editPedidoItem(pedidoItem: Pedidoitens) {
   if (pedidoItem) {
      if (String(pedidoItem.quantidade) === '') {
        pedidoItem.preco = 0;
      }
      else {
        pedidoItem.preco = Number(pedidoItem.quantidade) * pedidoItem.produto.preco;
      }

      // this.AtualizaValorTotal(this.pedidoItens.find((v) => v.produto.preco).preco);

   }
  }

  removerItem(pedidoItem: Pedidoitens) {
    let item = this.pedidoItens.find((f) => f.id === pedidoItem.id);

    if (item.quantidade > 1)  {
      let qtdATual = Number(item.quantidade);
      const qtd = qtdATual -= 1;
      item.preco = item.preco * qtd;
      item.quantidade = qtd;
    }
    else {
      item.preco = 0;
      item.quantidade = 0;

      if (this.pedidoItens.find(x => x.id === pedidoItem.id)) {
        this.pedidoItens.splice(this.pedidoItens.findIndex(x => x.id === pedidoItem.id), 1);
     }

    }
  }

  // AtualizaValorTotal(valorTotal: number) {
  //   this.valorTotal = valorTotal;
  // }

  gravarPedido(pedidoItens: Pedidoitens) {
    if (this.cliente && this.vendedor && pedidoItens) {
      new Pedidocabeca(0, this.cliente, this.vendedor, new Date(), 0);
    }
  }

  alterCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  getCliente() {

  }

}
