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

@Component({
  selector: 'app-relatorio-credenciamento',
  templateUrl: './relatorio-credenciamento.component.html',
  styleUrls: ['./relatorio-credenciamento.component.css']
})
export class RelatorioCredenciamentoComponent implements OnInit {

  @ViewChild('exportContent', { static: false }) el!: ElementRef;

  ListaCredenciamento: Credenciamento[] = [];
  ListaMunicipio: Municipio[] = [];
  ListaCredenciamento2: Credenciamento[] = [];
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


  buscar() {
    
    this.ListaCredenciamento.pop();
    this.ListaCredenciamento2.pop();
    this.listaNova.pop();
    this.arr.pop();

    
    /* this.pesquisaCredenciamento(elemento1, elemento2); */
    /* this.pegarsoma(elemento1,elemento2); */

    this.p1();

    const contador = timer(5000);
    contador.subscribe(() => {
      if (this.ListaCredenciamento.length > 0) {
        this.p1();
        this.contadorEsgotado = false;
      }
    })
  }

  pesquisaMunicipio(){
    this.AlunoService.getAllMunicipio().subscribe(result => { 
      
      
      this.ListaMunicipio = result 
      console.log(this.ListaMunicipio)
    })
  }

  pesquisaCredenciamento() {
    let elemento1 = (<HTMLInputElement>document.getElementById("data1")).value;
    let elemento2 = (<HTMLInputElement>document.getElementById("data2")).value;
    let elemento3 = (<HTMLInputElement>document.getElementById("exame")).value;
    this.AlunoService.getAllCredenciamento(elemento1,elemento2,elemento3).subscribe(result => { this.ListaCredenciamento = result })
  }
  pesquisaCredenciamento2() {
    let mun = (<HTMLInputElement>document.getElementById("mun")).value;
    let elemento1 = (<HTMLInputElement>document.getElementById("data1")).value;
    let elemento2 = (<HTMLInputElement>document.getElementById("data2")).value;
    let elemento3 = (<HTMLInputElement>document.getElementById("exame")).value;
    this.AlunoService.getAllCredenciamento2(elemento1,elemento2,mun,elemento3).subscribe(result => { this.ListaCredenciamento = result })
  }

  buscar2() {
    let mun = (<HTMLInputElement>document.getElementById("mun")).value;
    switch (mun) {
      case 'todos':
        this.novaPesquisa = true; 
        this.contadorEsgotado = true;
         
        let elemento1 = (<HTMLInputElement>document.getElementById("data1")).value;
        this.data1 = (<HTMLInputElement>document.getElementById("data1")).value;
        this.data2 = (<HTMLInputElement>document.getElementById("data2")).value;
         (<HTMLInputElement>document.getElementById("datas")).style.display="none";
         (<HTMLInputElement>document.getElementById("periodo")).style.display="block"
        let elemento2 = (<HTMLInputElement>document.getElementById("data2")).value; 
        let elemento5 = (<HTMLInputElement>document.getElementById("exame")).value;
        this.exame = (<HTMLInputElement>document.getElementById("exame")).value; 
     
        for (var i = 0; i < this.ListaMunicipio.length; i++) {
          
          console.log(this.ListaMunicipio[i]['municipio'])
          this.AlunoService.getAllCredenciamentosoma(elemento1, elemento2, this.ListaMunicipio[i]['municipio'], elemento5).subscribe(
    
            result => {
              
              this.ListaCredenciamento2 = result,
                this.listaSomaClinicas.push(this.ListaCredenciamento2);
    
            })
        }
        const contador = timer(3000);
        contador.subscribe(() => {
          if(this.ListaCredenciamento2.length <= 0){
            this.periodo = true;
            this.contadorEsgotado = false;
          }else{
            
            this.p1();
            this.pesquisaCredenciamento();
            this.contadorEsgotado = false;
          }
          
        })
        break;
        default:
          this.unico = true;
          this.novaPesquisa = true; 
        this.contadorEsgotado = true;
    
        let elemento3 = (<HTMLInputElement>document.getElementById("data1")).value;
        this.data1 = (<HTMLInputElement>document.getElementById("data1")).value;
        this.data2 = (<HTMLInputElement>document.getElementById("data2")).value;
        this.exame = (<HTMLInputElement>document.getElementById("exame")).value; 
         (<HTMLInputElement>document.getElementById("datas")).style.display="none";
         (<HTMLInputElement>document.getElementById("periodo")).style.display="block"
        let elemento4 = (<HTMLInputElement>document.getElementById("data2")).value; 
        let elemento6 = (<HTMLInputElement>document.getElementById("exame")).value; 
        
          this.AlunoService.getAllCredenciamentosoma(elemento3, elemento4, mun,elemento6).subscribe(
            result => {
              this.ListaCredenciamento2 = result,
                this.listaSomaClinicas.push(this.ListaCredenciamento2);
    
            })
        const contador2 = timer(3000);
        contador2.subscribe(() => {
          if(this.ListaCredenciamento2.length <= 0){
            this.periodo = true;
            this.contadorEsgotado = false;
          }else{
            
            this.p1();
            this.pesquisaCredenciamento2();
            this.contadorEsgotado = false;
          }
          
        })
    }
    
    
  }

  teste2 = [];

  p1() {

    var a = 0;
    for (var a = 0; a < this.listaSomaClinicas.length; a++) {
      for (var i = 0; i < this.listaSomaClinicas.length; i++) {
        if (this.listaSomaClinicas[a][i] == undefined) {
          continue
        }
        else {
          this.teste2.push(this.listaSomaClinicas[a][i])
        }

      }
    }
  }

  
  exportPDF() {
    this.salver = true
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

