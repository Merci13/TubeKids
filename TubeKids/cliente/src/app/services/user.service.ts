import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


//Nos permite injectar este servicio a otros componenstes
@Injectable()
export class UserService { //export, permite usarla fuera de la clase
    public identity;
    public token;
    public url: string; // Guardaremos la url de nuestra apirest
    constructor(private _http: Http) { //para poder usar el servicio http inyectamos la dependencia para poder usar todos sus metodos
        this.url = GLOBAL.url;
    }
    //user_to_login: usuario que se va a loggear
    //gethash = null xq no es obligatorio
    signup(user_to_login, gethash = null) {
        if (gethash != null) {
            user_to_login.gethash = gethash; // antes de convertirlo en string se lo asignaremos a hash 
        }
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new Headers({ 'Content-type': 'application/json' });
        return this._http.post(this.url + 'login', params, { headers })
            .map(res => res.json());
    }
    //Metodo para registrar al usuario 
    register(user_to_register) { //Recibe un objeto tipo usuario
        let json = JSON.stringify(user_to_register);//guardamos en un objeto json la variable
        let params = json;

        let headers = new Headers({ 'Content-type': 'application/json' });
        return this._http.post(this.url + 'register', params, { headers })
            .map(res => res.json());
    }

    VideoAdd(user_to_register) { //Recibe un objeto tipo usuario
        let json = JSON.stringify(user_to_register);//guardamos en un objeto json la variable
        let params = json;

        let headers = new Headers({ 'Content-type': 'application/json' });
        return this._http.post(this.url + 'video', params, { headers })
            .map(res => res.json());
    }


    //Metodo para modificar el usuario
    update_user(user_to_update) {
        let json = JSON.stringify(user_to_update);//guardamos en un objeto json la variable
        let params = json;
        //Le agregamos otra cabezera en este caso Authorization, que seria el token para 
        //autorizar los cambios
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put(this.url + 'update-user/' + user_to_update._id,
            params, { headers })
            .map(res => res.json());
    }
    //Metodos acceder a localstorage conseguir los datos que queremos
    //y devolverlos procesados con los datos que nos interesan
    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity; //asigna el valor a this.identity
        }
        else {
            this.identity = null;
        }
        return this.identity;
    }
    getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token; //asigna el valor a this.token
        }
        else {
            this.token = null;
        }
        return this.token;
    }
}