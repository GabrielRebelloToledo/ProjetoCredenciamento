import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import {Municipio} from './municipio'

import { AlunoService } from '../aluno.service'
import { UserService } from 'src/app/core/user/user.service';


@Component({
  selector: 'app-cadastrar-municipios',
  templateUrl: './cadastrar-municipios.component.html',
  styleUrls: ['./cadastrar-municipios.component.css']
})
export class CadastrarMunicipiosComponent implements OnInit {
  ListaMunicipio: Municipio[] = [];
  municipioForm: FormGroup;
  
  constructor(private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService) { }

  ngOnInit(): void {
    this.pesquisaMunicipio()
    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.AlunoService.getByIdupdateMunicipio(id))
      )
      .subscribe(aluno => this.editarForm(aluno)
      );

    this.municipioForm = this.formBuilder.group({
      id: [null],
      municipio: ['', Validators.required],
    });
  }

  pesquisaMunicipio(){
    this.AlunoService.getAllMunicipio().subscribe(result => { this.ListaMunicipio = result })
  }

  editarForm(credenciamento: Municipio) {

    this.municipioForm.patchValue(
      {
        id: credenciamento[0].id,
        municipio: credenciamento[0].municipio,
      }
    )
  }

  submit() {
    if (this.municipioForm.value.id) {
      const atualizarAluno = this.municipioForm.getRawValue() as Municipio;
      
      this.AlunoService.updateMunicipio(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.municipioForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      const novoAluno = this.municipioForm.getRawValue() as Municipio;
      this.AlunoService.MunicipioCreate(novoAluno).subscribe(
        success => {
          alert('Receita salva!')
          this.municipioForm.reset()
          this.pesquisaMunicipio()
        },
        error => {
          alert('Receita ao salvar.')
        }
      )
    }
  }
}
