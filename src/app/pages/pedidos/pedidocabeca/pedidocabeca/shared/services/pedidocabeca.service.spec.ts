import { TestBed } from '@angular/core/testing';

import { PedidocabecaService } from './pedidocabeca.service';

describe('PedidocabecaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidocabecaService = TestBed.get(PedidocabecaService);
    expect(service).toBeTruthy();
  });
});
