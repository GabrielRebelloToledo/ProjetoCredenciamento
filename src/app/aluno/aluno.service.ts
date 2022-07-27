import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Receitas } from './aluno';
import { Clinica } from './cadastrar-clinicas/clinica';
import { Municipio } from './cadastrar-municipios/municipio';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { Categoria } from './cadastro-categorias/categoria';
import { Credenciamento } from './lancar-credenciamento/credenciamento';


const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}receita`);
  }
  getAllSum(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}receita/sum`);
  }

  create(receitas: Receitas) {
    return this.http.post(`${API}receita`, receitas).pipe(take(1));
  }

  createDespesas(despesas: Receitas) {
    return this.http.post(`${API}despesas`, despesas).pipe(take(1));
  }
  getAllDespesasSum(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}despesas/sum`);
  }
  getAllDespesas(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}despesas`);
  }
  
  createCategoria(categoria: Categoria) {
    return this.http.post(`${API}categoria`, categoria).pipe(take(1));
  }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${API}categoria`);
  }

 
  
  getById(id) {
    if (!id) return EMPTY;
    return this.http.get<Receitas>(`${API}aluno/${id}`);
  }
  getByIdCategoria(id) {
    if (!id) return EMPTY;
    return this.http.get<Categoria>(`${API}aluno/${id}`);
  }

  updateCategoria(update) {
    console.log(update)
    return this.http.put(`${API}categoria/${update.id}`, update).pipe(take(1));
  }

  update(update) {
    console.log(update)
    return this.http.put(`${API}aluno/${update.id}`, update).pipe(take(1));
  }

  delete(id) {
    return this.http.delete<Receitas[]>(`${API}aluno/${id}`);
  }


  /* Novo a partir daqui !!! */
  CredenciamentoCreate(credenciamento: Credenciamento) {
    console.log(credenciamento)
    return this.http.post(`${API}credenciamento`, credenciamento).pipe(take(1));
  }
  MunicipioCreate(municipio: Municipio) {
    return this.http.post(`${API}municipio`, municipio).pipe(take(1));
  }
  
  MunicipioDelete(id) {
    return this.http.delete<Municipio[]>(`${API}municipio/${id}`);
  }
  ClinicaDelete(id) {
    return this.http.delete<Clinica[]>(`${API}clinica/${id}`);
  }
  CredenciamentoDelete(id) {
    return this.http.delete<Credenciamento[]>(`${API}credenciamento/${id}`);
  }

  ClinicaCreate(clinica: Clinica) {
    return this.http.post(`${API}clinica`, clinica).pipe(take(1));
  }

  updateClinica(update) {
    console.log(update)
    return this.http.put(`${API}clinica/${update.id}`, update).pipe(take(1));
  }
  updateMunicipio(update) {
    console.log(update)
    return this.http.put(`${API}clinica/${update.id}`, update).pipe(take(1));
  }

  updateCredenciamento(update) {
    console.log(update)
    return this.http.put(`${API}credenciamento/${update.id}`, update).pipe(take(1));
  }
  getByIdupdateCredenciamento(id) {
    if (!id) return EMPTY;
    return this.http.get<Credenciamento>(`${API}credenciamento/${id}`);
  }
  getByIdupdateClinica(id) {
    if (!id) return EMPTY;
    return this.http.get<Clinica>(`${API}credenciamento/${id}`);
  }
  getByIdupdateMunicipio(id) {
    if (!id) return EMPTY;
    return this.http.get<Municipio>(`${API}credenciamento/${id}`);
  }

  getAllMunicipio(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${API}municipio`);
  }
  getAllClinica(): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(`${API}clinica`);
  }
  getAllCredenciamentoT(): Observable<Credenciamento[]> {
    return this.http.get<Credenciamento[]>(`${API}credenciamento/todos`);
  }
  getAllCredenciamento(dt1,dt2,exame): Observable<Credenciamento[]> {
    return this.http.get<Credenciamento[]>(`${API}credenciamento/${dt1}/${dt2}/${exame}`);
  }
  getAllCredenciamento2(dt1,dt2,mun,exame): Observable<Credenciamento[]> {
    console.log(dt1,dt2,mun)
    return this.http.get<Credenciamento[]>(`${API}credenciamento/municipio/${dt1}/${dt2}/${mun}/${exame}`);
  }
  getAllCredenciamentosoma(dt1,dt2,mun,exame): Observable<Credenciamento[]> {
    /* console.log(dt1,dt2,mun) */
    return this.http.get<Credenciamento[]>(`${API}credenciamento/soma/${dt1}/${dt2}/${mun}/${exame}`);

  }
}
