import { InMemoryDbService } from 'angular-in-memory-web-api'

import { Produto } from './pages/produtos/shared/models/produto.model';
import { Pedidoitens } from './pages/pedidos/pedidoitens/shared/models/pedidoitens';
import { Cliente } from './pages/clientes/shared/models/cliente';
import { Vendedor } from './pages/vendedores/shared/models/vendedor';
import { Pedidocabeca } from './pages/pedidos/pedidocabeca/shared/models/pedidocabeca';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {

    const clientes: Cliente[] = [
      { id: 1, nome: 'Luiz Fabiano da Silva', status: true, credito: 100 },
      { id: 2, nome: 'Mariana Pereira', status: false, credito: 100 },
      { id: 3, nome: 'Felipe Monteiro', status: false, credito: 100 },
      { id: 4, nome: 'Guilherme dos Santos', status: false, credito: 100 },
      { id: 5, nome: 'Ana Caetano', status: true, credito: 100 },
      { id: 6, nome: 'Jéssica Pereira', status: false, credito: 100 },
      { id: 7, nome: 'Dorotéia Magalhães', status: false, credito: 100 },
      { id: 8, nome: 'Patricia Fernandes', status: true, credito: 100 },
      { id: 9, nome: 'Pedro Rafael Pereira', status: true, credito: 100 },
      { id: 10, nome: 'Gabriela Nonato', status: true, credito: 100 },
      { id: 11, nome: 'Marcelino Alves', status: true, credito: 0 },
      { id: 12, nome: 'Gabriel Dutra', status: true, credito: 0 },
      { id: 13, nome: 'Severino José', status: true, credito: 0 },
    ];

    const vendedores: Vendedor[] = [
      { id: 1, nome: 'Renato Costa', ativo: true, },
      { id: 2, nome: 'Viviane Neves', ativo: true, },
      { id: 3, nome: 'Camila da Silva', ativo: true, },
      { id: 4, nome: 'Frederico Albuquerque', ativo: false, },
      { id: 5, nome: 'Sandra de Cassia', ativo: false, },
    ]

    const produtos: Produto[] = [
      { id: 1, descricao: 'Cartão Presente R$50', unidade: 'und.', estoque: 5, preco: 50 },
      { id: 2, descricao: 'Notebook Acer Core I5', unidade: 'und.', estoque: 5, preco: 3400 },
      { id: 3, descricao: 'Cafeteira Dolce Gusto', unidade: 'und.', estoque: 5, preco: 299.99 },
      { id: 4, descricao: 'Jogo de Panelas c/ 10 pçs', unidade: 'und.', estoque: 5, preco: 149.99 },
      { id: 5, descricao: 'Jogo Xbox GTA V', unidade: 'und.', estoque: 2, preco: 99.99 },
      { id: 6, descricao: 'Cartão Presente R$100', unidade: 'und.', estoque: 5, preco: 100 },
      { id: 7, descricao: 'Leite Longa Vida', unidade: 'LT', estoque: 5, preco: 1.99 },
      { id: 8, descricao: 'Pão Francês', unidade: 'KG', estoque: 5, preco: 2.50 },
      { id: 9, descricao: 'Azeitonas em conserva', unidade: 'KG', estoque: 5, preco: 8.50 },
      { id: 10, descricao: 'Carne Bovina Picanha', unidade: 'KG', estoque: 5, preco: 39.50 },
    ]

    const pedidoCabeca: Pedidocabeca[] = [
      { id: 0, cliente: null, vendedor: null, data: new Date(2020, 2, 15, 21, 0, 0), total: 0 }
    ]

    const pedidoItens: Pedidoitens[] = [
      { id: 0, idPedido: 0, produto: produtos[0], quantidade: 0, precoUnitario: 0, desconto: 0, valorTotal: 0 }
    ]

    return { clientes, vendedores, produtos, pedidoCabeca, pedidoItens };
  }
}
