import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

//Usamos el componet para indicar los metadatos que va a tener este componente
//y las caracteristicas
@Component({
    selector: 'user-edit', //Etiqueta del componente
    templateUrl: '../views/user-edit.html', // la vista de este componente estara en este fichero
    providers: [UserService] //para cargar los servicios
})
//Es necesario el metodo OnInit ya que es muy util
export class UserEditComponent implements OnInit {
    public titulo: string;
    public user: User; //USuario que vamos a cargar
    public identity;
    public token;
    public alertMessage;

    //Cargaremos el servicio
    constructor(
        private _userService: UserService
    ) {

        this.titulo = "Actualizar mis datos";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;

    }

    ngOnInit() {
        console.log('user-edit.components.ts cargado');
    }
    onSubmit() {
        console.log(this.user);
        this._userService.update_user(this.user).subscribe(
            response => {
                this.user = response.user; //El valor nuevo lo asignamos a la propiedad user 
                if (!response.user) {
                    this.alertMessage = 'EL usuario no se ha actualizado';
                } else {
                    this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));//actulizamos identity en localstorage
                    this.alertMessage = 'EL usuario se ha actualizado';
                }
            },
            error => {
                var alertMessage = <any>error;
                if (alertMessage != null) {
                    var body = JSON.parse(error._body) //convertimos el texto en un obj json
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }

        );
    }

}