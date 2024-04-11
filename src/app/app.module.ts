import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { IndexComponent as ProdutoIndexComponent } from './produtos/index/index.component';
import { FormComponent as ProdutoFormComponent } from './produtos/form/form.component';
import { IndexComponent as VendaIndexComponent } from './venda/index/index.component';
import { FormComponent as VendaFormComponent } from './venda/form/form.component';
import { IndexComponent as TiposProdutoIndexComponent } from './tipos-produto/index/index.component';
import { FormComponent as TiposProdutoFormComponent } from './tipos-produto/form/form.component';
import { DefaultHeaderComponent } from './common/default-header/default-header.component';
import { SearchInputComponent } from './common/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProdutoSearchComponent } from './produtos/produto-search/produto-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, NgFor } from '@angular/common';
import { DialogComponent } from './common/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProdutoIndexComponent,
    ProdutoFormComponent,
    VendaIndexComponent,
    VendaFormComponent,
    DefaultHeaderComponent,
    TiposProdutoIndexComponent,
    TiposProdutoFormComponent,
    SearchInputComponent,
    ProdutoSearchComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    NgFor,
    AsyncPipe,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
