import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';

@NgModule({
  declarations: [RelatorioComponent],
  imports: [
    SharedModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
