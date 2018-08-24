import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]  //se cargan todos los servicios que se desean
})
export class AppComponent implements OnInit { //forzamos que OnInit exista
  title = 'TubeKids';
  public user: User;
  public user_register: User;
  public identity;// variable que guardara los datos del usuario registrado en localstorage
  public token; //estara guardado en el localstorage
  public errorMessage;
  public alertRegister;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService //Tendra todos los metodos que tenga nuestro servicio

  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
  }


  ngOnInit() { //Cargar el componente
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   
    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit() {
    console.log(this.user);
    //Conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response => { //Tendremos todos los datos que nos devuelva el api
        let identity = response.user; //se guarda los datos del usuario en identity
        this.identity = identity;// identity variable global
        if (!this.identity._id) //si no esta correcto
        {
          alert("Usuario no loggeado")
        } else {
          //crear elemento en el localstorage para tener al usuario
          localStorage.setItem('identity', JSON.stringify(identity));


          //conseguir el token para enviarlo a cada peticion http
          this._userService.signup(this.user, 'true').subscribe(
            response => { //Tendremos todos los datos que nos devuelva el api
              let token = response.token; //se guarda los datos del usuario en identity
              this.token = token;// identity variable global
              if (this.token.length <= 0) //si no esta correcto
              {
                alert("El token no se ha generado")
              } else {
                //crear elemento en el localstorage para tener el token disponible
                localStorage.setItem('token', token);
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');//Limpiar campos
              }
            },
            error => {
              var errorMessage = <any>error;
              if (errorMessage != null) {
                var body = JSON.parse(error._body) //convertimos el texto en un obj json
                this.errorMessage = body.message;
                console.log(error);
              }
            }
          );
        }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body) //convertimos el texto en un obj json
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }
  //Metodo para eliminar los datos del localstorage y poder cerrar la sesion
  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }


  //Metodo para poder registrar al usuario
  onSubmitRegister() {
    console.log(this.user_register);
    //subscribe tiene dos funciones de callback
    //Pasamos el user_register para que ese usuario lo guarde a la bd
    this._userService.register(this.user_register).subscribe(
      response => {

        let user = response.user;//guardamos el usuario de la base de datos
        this, this.user_register = user;// le damos un valor, el objeto relleno con los datos nuevos

        if (!user._id) {
          this.alertRegister = 'Error al registrarse';
        } else {
          //Si viene con todo es que nos devolvio un tipo usuario correcto
          this.alertRegister = 'Registro realizado correctamente, identificate con ' + this.user_register.email;
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');
        }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body) //convertimos el texto en un obj json
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }
}
