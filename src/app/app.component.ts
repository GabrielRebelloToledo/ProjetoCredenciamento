import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup; //diretiva para controle do formulário
  @Input() loginError: boolean;
  lopping: boolean = false;
  users;
  title = 'Credenciamento';
  logado:boolean;

  @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver, 
    private user: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {}

   ngOnInit() {
    this.loginForm = this.formBuilder.group({  
      login: ['', Validators.required],
      password: ['', Validators.required]
      }); 
      
    this.logado =  this.user.isLogged()
      this.users = this.user.user.nome;
      
  } 

  logout(){
    this.user.logout();
    window.location.reload();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 1000px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  login(){
    const login = this.loginForm.get('login').value;
    const password = this.loginForm.get('password').value;
this.authService
    .authenticate(login, password)
    .subscribe(
        () => this.router.navigate(['home']), //informe a rota que irá abrir após o login 
        err => {
        console.log(err);
        this.loginError = true;
        }
    );
    this.lopping = true;
    this.loginError = true;

    const contador = timer(5000);
    contador.subscribe(()=>{
    this.authService
    .authenticate(login, password)
    .subscribe(
        () => this.router.navigate(['home']), //informe a rota que irá abrir após o login 
        /* err => {
        console.log(err);
        if(!this.loginError){
            
        }else
        this.loginError = true;
        } */
    );  
    this.logado =  this.user.isLogged()
        this.temtoken();

    })
}
temtoken(){
    const contador = timer(1000);
    contador.subscribe(()=>{
        if(!this.user.isLogged()){
            this.loginError = false;
            this.lopping = false;
           /*  window.location.reload(); */
        }
        this.logado =  this.user.isLogged()
        
    })
}
}


