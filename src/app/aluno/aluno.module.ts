import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { ListaAlunoComponent } from './lista-aluno/lista-aluno.component';
import { AppRoutingModule } from '../app.routing.module';
import { CadastroCategoriasComponent } from './cadastro-categorias/cadastro-categorias.component';
import { CadastroDespesasComponent } from './cadastro-despesas/cadastro-despesas.component';
import { LancarCredenciamentoComponent } from './lancar-credenciamento/lancar-credenciamento.component';
import { CadastrarClinicasComponent } from './cadastrar-clinicas/cadastrar-clinicas.component';
import { CadastrarMunicipiosComponent } from './cadastrar-municipios/cadastrar-municipios.component';
import { RelatorioCredenciamentoComponent } from './relatorio-credenciamento/relatorio-credenciamento.component';



@NgModule({
  declarations: [
    CadastroAlunoComponent, 
    ListaAlunoComponent, CadastroCategoriasComponent, CadastroDespesasComponent, LancarCredenciamentoComponent, CadastrarClinicasComponent, CadastrarMunicipiosComponent, RelatorioCredenciamentoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    CadastroAlunoComponent, 
    ListaAlunoComponent
  ]
})
export class AlunoModule { }
