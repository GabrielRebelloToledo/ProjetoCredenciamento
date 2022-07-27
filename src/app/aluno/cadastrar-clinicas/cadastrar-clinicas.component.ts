import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import {Clinica} from './clinica'

import { AlunoService } from '../aluno.service'
import { UserService } from 'src/app/core/user/user.service';
@Component({
  selector: 'app-cadastrar-clinicas',
  templateUrl: './cadastrar-clinicas.component.html',
  styleUrls: ['./cadastrar-clinicas.component.css']
})
export class CadastrarClinicasComponent implements OnInit {
  ListaClinica: Clinica[] = [];
  clinicaForm: FormGroup;

  constructor(private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService) { }

  ngOnInit(): void {
    this.pesquisaClinica()

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.AlunoService.getByIdupdateClinica(id))
    )
    .subscribe(aluno => this.editarForm(aluno)
    );

  this.clinicaForm = this.formBuilder.group({
    id: [null],
    clinica: ['', Validators.required],
    cnpj: ['', Validators.required],
  });
  
  }

  pesquisaClinica(){
    this.AlunoService.getAllClinica().subscribe(result => { this.ListaClinica = result })
  }

  deletarClinica(id) {

    if (window.confirm('Tem certeza que deseja excluir esta Clinica? Ao Excluir você pode afetar alguns relatórios!')) {
      this.AlunoService.ClinicaDelete(id).subscribe(result => { this.ListaClinica = result; })
      alert('Clinica excluída.')
      window.location.reload();
    }

  }

  editarForm(clinica: Clinica) {

    this.clinicaForm.patchValue(
      {
        id: clinica[0].id,
        municipio: clinica[0].municipio,
      }
    )
  }

  submit() {
    if (this.clinicaForm.value.id) {
      const atualizarAluno = this.clinicaForm.getRawValue() as Clinica;
      
      this.AlunoService.updateClinica(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.clinicaForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      const novoAluno = this.clinicaForm.getRawValue() as Clinica;
      this.AlunoService.ClinicaCreate(novoAluno).subscribe(
        success => {
          alert('Clinica salva!')
          this.clinicaForm.reset()
          this.pesquisaClinica()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }
}
