import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoitensRoutingComponent } from './pedidoitens-routing.component';

describe('PedidoitensRoutingComponent', () => {
  let component: PedidoitensRoutingComponent;
  let fixture: ComponentFixture<PedidoitensRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoitensRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoitensRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
