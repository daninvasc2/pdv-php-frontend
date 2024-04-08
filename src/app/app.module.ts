import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexComponent as ProdutoIndexComponent } from './produtos/index/index.component';
import { FormComponent as ProdutoFormComponent } from './produtos/form/form.component';
import { IndexComponent as VendaIndexComponent } from './venda/index/index.component';
import { FormComponent as VendaFormComponent } from './venda/form/form.component';
import { IndexComponent as TiposProdutoIndexComponent } from './tipos-produto/index/index.component';
import { FormComponent as TiposProdutoFormComponent } from './tipos-produto/form/form.component';
import { VisualizarVendaComponent } from './venda/visualizar-venda/visualizar-venda.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProdutoIndexComponent,
    ProdutoFormComponent,
    VendaIndexComponent,
    VendaFormComponent,
    VisualizarVendaComponent,
    DefaultHeaderComponent,
    TiposProdutoIndexComponent,
    TiposProdutoFormComponent,
    SearchInputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
