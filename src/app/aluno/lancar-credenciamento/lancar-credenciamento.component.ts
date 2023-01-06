import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import {Credenciamento} from './credenciamento'

import { AlunoService } from '../aluno.service'
import { UserService } from 'src/app/core/user/user.service';
import { Clinica } from '../cadastrar-clinicas/clinica';
import { Municipio } from '../cadastrar-municipios/municipio';
@Component({
  selector: 'app-lancar-credenciamento',
  templateUrl: './lancar-credenciamento.component.html',
  styleUrls: ['./lancar-credenciamento.component.css']
})
export class LancarCredenciamentoComponent implements OnInit {
  ListaCredenciamento: Credenciamento[] = [];
  ListaMunicipio: Municipio[] = [];
  ListaClinica: Clinica[] = [];
  credenciamentoForm: FormGroup;
  
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService) { }

  ngOnInit(): void {

    this.pesquisaMunicipio();
    this.pesquisaClinica();
    this.pesquisaCredenciamento();

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.AlunoService.getByIdupdateCredenciamento(id))
      )
      .subscribe(aluno => this.editarForm(aluno)
      );

    this.credenciamentoForm = this.formBuilder.group({
      id: [null],
      valor: ['', Validators.required],
      municipio: ['', Validators.required],
      clinica: ['', Validators.required],
      exame: ['', Validators.required],
      data: ['', Validators.required],
    });
  }

  editarForm(credenciamento: Credenciamento) {

    this.credenciamentoForm.patchValue(
      {
        id: credenciamento[0].id,
        valor: credenciamento[0].valor,
        municipio: credenciamento[0].municipio,
        clinica: credenciamento[0].clinica,
        exame: credenciamento[0].clinica,
        data: credenciamento[0].data
      }
    )
  }

  pesquisaCredenciamento(){
    this.AlunoService.getAllCredenciamentoT().subscribe(result => { this.ListaCredenciamento = result })
  }
  pesquisaMunicipio(){
    this.AlunoService.getAllMunicipio().subscribe(result => { this.ListaMunicipio = result })
  }
  pesquisaClinica(){
    this.AlunoService.getAllClinica().subscribe(result => { this.ListaClinica = result })
  }
  deletarCredenciamento(id) {

    if (window.confirm('Tem certeza que deseja excluir este lançamento?')) {
      this.AlunoService.CredenciamentoDelete(id).subscribe(result => { this.ListaMunicipio = result; })
      alert('Município excluído.')
      window.location.reload();
    }

  }

  submit() {
    if (this.credenciamentoForm.value.id) {
      const atualizarAluno = this.credenciamentoForm.getRawValue() as Credenciamento;
      
      this.AlunoService.updateCredenciamento(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.credenciamentoForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      const novoAluno = this.credenciamentoForm.getRawValue() as Credenciamento;
      this.AlunoService.CredenciamentoCreate(novoAluno).subscribe(
        success => {
          alert('Receita salva!')
          this.credenciamentoForm.reset()
          this.pesquisaCredenciamento();
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }
}
