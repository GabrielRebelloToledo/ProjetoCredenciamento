import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { jsPDF } from "jspdf";

import { AlunoService } from '../aluno.service'
import { UserService } from 'src/app/core/user/user.service';

import { Credenciamento } from '../lancar-credenciamento/credenciamento';
import { timer } from 'rxjs';
import html2canvas from 'html2canvas';
import { Municipio } from '../cadastrar-municipios/municipio';
import { CredenciamentoSoma } from './credeniamentoSoma';

@Component({
  selector: 'app-relatorio-credenciamento',
  templateUrl: './relatorio-credenciamento.component.html',
  styleUrls: ['./relatorio-credenciamento.component.css']
})
export class RelatorioCredenciamentoComponent implements OnInit {

  @ViewChild('exportContent', { static: false }) el!: ElementRef;

  ListaCredenciamento: Credenciamento[] = [];
  ListaMunicipio: Municipio[] = [];
  ListaCredenciamentoSoma: CredenciamentoSoma[] = [];
  credenciamentoForm: FormGroup;
  listaNova = [];
  arr = [];

  teste;
  data1;
  data2;
  exame;
  contadorEsgotado: boolean = false;
  salver: boolean = false;
  periodo: boolean = false;
  busca: boolean = true;
  novaPesquisa: boolean = false;
  unico: boolean = false;
  btpdf: boolean = false;
  listaSomaClinicas = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {
    this.pesquisaMunicipio();
  }


  

  pesquisaMunicipio(){
    this.AlunoService.getAllMunicipio().subscribe(result => { 
      
      
      this.ListaMunicipio = result 
      console.log(this.ListaMunicipio)
    })
  }

  pesquisaCredenciamento() {
    let varaux;
    let elemento1 = (<HTMLInputElement>document.getElementById("data1")).value;
    let elemento2 = (<HTMLInputElement>document.getElementById("data2")).value;
    let elemento3 = (<HTMLInputElement>document.getElementById("mun")).value;
    this.data1 = elemento1;
    this.data2 = elemento2;
    if(elemento3 == 'null'){
       varaux = null;
    }else {
      varaux = elemento3;
    }
    this.AlunoService.getAllCredenciamento(elemento1,elemento2,varaux).subscribe(result => { this.ListaCredenciamento = result, this.ListaCredenciamento.length > 0 ? this.btpdf = true : this.btpdf = false  });
    this.AlunoService.getAllCredenciamentosoma(elemento1,elemento2,varaux).subscribe(result => { this.ListaCredenciamentoSoma = result, this.ListaCredenciamentoSoma.length > 0 ? this.periodo = false : this.periodo = true });
  
  /* if(this.ListaCredenciamento.length > 0  && this.ListaCredenciamentoSoma.length >0){
    this.salver =true;
  } */
  
  }
  

  PDF(){
    this.salver = true
    this.exportPDF();
  }

  
  exportPDF() {
   /*  this.salver = true */
   /* alert('Entrou aq') */
    const contador = timer(5000);
    contador.subscribe(() => {
      var doc = new jsPDF('p', 'pt', 'a4');
      doc.html(this.el.nativeElement, {
        callback: (doc) => {
          doc.save("Relatorio Credenciamento.pdf")
        }
      })
    })
  }
  exportPDF2() {

    var doc = new jsPDF('p', 'pt', 'a4');
    doc.html(this.el.nativeElement, {
      callback: (doc) => {
        doc.save("Relatorio Credenciamento.pdf")
      }
    })

  }

  novaBusca(){
    window.location.reload()
  }


}

