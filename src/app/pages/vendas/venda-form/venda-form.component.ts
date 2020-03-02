import { Component, OnInit, HostListener } from '@angular/core';

import { Produto } from '../../produtos/shared/models/produto.model';
import { ProdutoService } from '../../produtos/shared/services/produto.service';
import { Pedidoitens } from '../../pedidos/pedidoitens/shared/models/pedidoitens';
import { Cliente } from '../../clientes/shared/models/cliente';
import { ClienteService } from '../../clientes/shared/services/cliente.service';
import { Vendedor } from '../../vendedores/shared/models/vendedor';
import { VendedorService } from '../../vendedores/shared/services/vendedor.service';
import { PedidoitensService } from '../../pedidos/pedidoitens/shared/services/pedidoitens.service';
import { Pedidocabeca } from '../../pedidos/pedidocabeca/shared/models/pedidocabeca';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ConfirmationService } from 'primeng/api';
import { VendaService } from '../shared/services/venda.service';
import { PedidocabecaService } from '../../pedidos/pedidocabeca/shared/services/pedidocabeca.service';
declare var $: any;

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

  pedidoItens: Pedidoitens[] = [];
  produtos: Produto[] = [];
  produtosFilter: Produto[] = [];
  produto: Produto = new Produto();
  clientes: Cliente[] = [];
  cliente: Cliente = null;
  vendedores: Vendedor[] = [];
  vendedor: Vendedor = null;

  searchText: string = '';
  searchDescricao: string = 'descrição do produto';
  valorTotal: number = 0;
  produtoQTD: number;
  produtoPreco: number = 0;
  ultimoPedido: number = 0;
  descontoUnt: number = 0;

  mdlSampleIsOpen: boolean = false;

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F8') {
      this.searchDescricao = '';
      this.open();
    }
  }

  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private vendedorService: VendedorService,
    private pedidoItensService: PedidoitensService,
    private pedidocabecaService: PedidocabecaService,
    private config: NgSelectConfig,
    protected confirmationService: ConfirmationService) {
    this.config.notFoundText = 'Item não encontrado';
  }

  ngOnInit() {
    this.getClientes();
    this.getVendedores();
    this.getProdutos();
  }

  getClientes() {
    this.clienteService.getAll().subscribe(
      clientes => this.clientes = clientes.
        filter((f) => f.credito > 0).
        sort((a, b) => a.id - b.id)
    );
  }

  getVendedores() {
    this.vendedorService.getAll().subscribe(
      vendedores => this.vendedores = vendedores.
        filter((f) => f.ativo === true).
        sort((a, b) => a.id - b.id)
    );
  }

  getProdutos() {
    this.produtoService.getAll().subscribe(
      prod => this.produtos = prod.sort((a, b) => a.id - b.id)
    );
  }

  addProduto(produto: Produto) {
    produto = this.produto;
    let desconto = (produto.preco - Number(this.produtoPreco));
    this.pedidoItens.push(new Pedidoitens(this.pedidoItens.length + 1, 0, produto, this.produtoQTD, this.produto.preco, desconto, this.produtoPreco));
    this.limparDadosFiltros(true);
    this.AtualizaValorTotal();
  }

  editPedidoItem(pedidoItem: Pedidoitens) {
    if (pedidoItem) {
      if (String(pedidoItem.quantidade) === '') {
        pedidoItem.precoUnitario = 0;
      }
      else {
        pedidoItem.precoUnitario = Number(pedidoItem.quantidade) * pedidoItem.produto.preco;
      }
    }
  }

  async removerItem(pedidoItem: Pedidoitens) {
    this.confirmationService.confirm({
      message: 'Deseja cancelar o item?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
      accept: () => {
        if (this.pedidoItens.find(x => x.id === pedidoItem.id)) {
          this.pedidoItens.splice(this.pedidoItens.findIndex(x => x.id === pedidoItem.id), 1);
        }
        this.AtualizaValorTotal();
      },
    });
  }

  AtualizaValorTotal() {
    this.valorTotal = this.pedidoItens.reduce((sum, current) => sum + (current.precoUnitario * current.quantidade) - (current.desconto * current.quantidade), 0);
  }

  gravarPedido(pedidoItens: Pedidoitens[]) {
    if (this.cliente && this.vendedor && pedidoItens) {
      const pedidoCabeca = Object.assign(new Pedidocabeca(this.ultimoPedido += 1, this.cliente, this.vendedor, new Date(), this.valorTotal));
      this.pedidocabecaService.create(pedidoCabeca).
        subscribe(
          pedidoCabeca => this.actionsForSuccess(pedidoCabeca),
          error => this.actionsForError(error)
        );
      alert('Pedido Gravado com sucesso');
      this.limparDadosTela();
    }
  }

  private actionsForSuccess(venda: Pedidocabeca) {
    console.log("Sucesso")
  }

  private actionsForError(venda: any) {
    console.log("Ocorreu um erro")
  }

  alterCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  alterVendedor(vendedor: Vendedor) {
    this.vendedor = vendedor;
  }

  customSearchFnCliente(term: string, item: Cliente) {
    term = term.toLowerCase();
    return item.nome.toLowerCase().indexOf(term) > -1 || item.nome.toLowerCase() === term || item.id === Number(term);
  }

  customSearchFnVendedor(term: string, item: Vendedor) {
    term = term.toLowerCase();
    return item.nome.toLowerCase().indexOf(term) > -1 || item.nome.toLowerCase() === term || item.id === Number(term);
  }

  filtrarProdutoPorCodigo(searchText: string) {
    if (searchText === '') {
      this.produtoQTD = null;
      this.produtoPreco = null;
      this.searchDescricao = 'descrição do produto';
    }
    else {
      this.produto = this.produtos.find(it => it.id === Number(searchText));

      if (this.produto) {
        this.produtoQTD = 1;
        this.produtoPreco = this.produto.preco;
        this.searchDescricao = this.produto.descricao;
      }
      else
        this.limparDadosFiltros(false);
    }
  }

  filtrarProdutoPorDescricao(searchDescricao: string) {
    if (searchDescricao === '') {
      this.produtoQTD = null;
      this.produtoPreco = null;
      this.searchDescricao = '';
      this.getProdutos();
    }
    else {
      this.getProdutos();
      this.produtosFilter = this.produtos.
        filter((f) => f.descricao.toLowerCase().indexOf(searchDescricao.toLowerCase()) > -1 || f.descricao.toLowerCase() === searchDescricao.toLowerCase()).
        sort((a, b) => a.id - b.id);
      this.open();
    }

  }

  editouQtdProduto() {
    if (String(this.produtoQTD) === '' || String(this.produtoQTD).trim() === '' || this.produtoQTD === undefined) {
      this.produtoPreco = 0;
    }
    else {
      this.produto = this.produtos.find(it => it.id === Number(this.searchText));
      this.produtoPreco = this.produto.preco;
    }
  }

  checkProduto(produto: Produto) {
    this.produto = this.produtos.find(it => it.id === produto.id);
    this.produtoQTD = 1;
    this.produtoPreco = this.produto.preco;
    this.searchText = String(this.produto.id);
    this.searchDescricao = this.produto.descricao;
    this.hide();
  }

  limparDadosTela() {
    this.cliente = new Cliente();
    this.vendedor = new Vendedor();
    this.pedidoItens = [];
    this.searchText = '';
    this.produtoQTD = null;
    this.produtoPreco = null;
    this.searchDescricao = '';
  }

  limparDadosFiltros(limparCodigo: boolean) {
    this.produtoQTD = null;
    this.produtoPreco = null;
    this.searchDescricao = 'descrição do produto';
    if (limparCodigo)
      this.searchText = '';
  }

  open() {
    $('#ModalProdutos').modal('show')
  }

  hide() {
    $('#ModalProdutos').modal('hide')
  }

}
