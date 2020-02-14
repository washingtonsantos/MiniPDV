import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',  redirectTo: '/vendas', pathMatch: 'full' },
  { path: 'vendas',  loadChildren: './pages/vendas/vendas.module#VendasModule' },
  { path: 'relatorios', loadChildren: './pages/relatorios/relatorios.module#RelatoriosModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
