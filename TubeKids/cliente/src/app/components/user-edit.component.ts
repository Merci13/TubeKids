import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

//Usamos el componet para indicar los metadatos que va a tener este componente
//y las caracteristicas
@Component({
    selector: 'usr-edit', //Etiqueta del componente
    templateUrl: '../views/user-edit.html', // la vista de este componente estara en este fichero
    providers: [UserService] //para cargar los servicios
})
//Es necesario el metodo OnInit ya que es muy util
export class UserEditComponent implements OnInit {
    public titulo: string; 
    public user: User; //USuario que vamos a cargar
    public identity;
    public token;

    //Cargaremos el servicio
    constructor(
        private _userService:UserService 
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.titulo = 'Actualizar mis datos';
        
    }

    ngOnInit() {
        console.log('user-edit.components.ts cargado');
        
    }

}