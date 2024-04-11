import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent as ProdutoIndexComponent } from './produtos/index/index.component';
import { FormComponent as ProdutoFormComponent } from './produtos/form/form.component';
import { IndexComponent as VendaIndexComponent } from './venda/index/index.component';
import { FormComponent as VendaFormComponent } from './venda/form/form.component';
import { IndexComponent as TiposProdutoIndexComponent } from './tipos-produto/index/index.component';
import { FormComponent as TiposProdutoFormComponent } from './tipos-produto/form/form.component';

const routes: Routes = [
  { path: '', redirectTo: 'vendas', pathMatch: 'full' },
  { path: 'vendas', component: VendaIndexComponent },
  { path: 'venda/cadastrar', component: VendaFormComponent },
  { path: 'venda/editar/:id', component: VendaFormComponent },
  { path: 'produtos', component: ProdutoIndexComponent },
  { path: 'produto/cadastrar', component: ProdutoFormComponent },
  { path: 'produto/editar/:id', component: ProdutoFormComponent },
  { path: 'tipos-produto', component: TiposProdutoIndexComponent },
  { path: 'tipo-produto/cadastrar', component: TiposProdutoFormComponent },
  { path: 'tipo-produto/editar/:id', component: TiposProdutoFormComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
