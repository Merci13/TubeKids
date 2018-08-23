import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global'
import { User } from '../models/user';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
    public url: string;

    //Cargaremos el servicio
    constructor(
        private _userService: UserService
    ) {

        this.titulo = "Actualizar mis datos";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;

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
                    // this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));//actulizamos identity en localstorage
                    
                    document.getElementById("identity_name").innerHTML = this.user.name;
                    if (!this.filesToUpload) {
                        //Si el metodo filesToUpload tiene contenido
                        this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload).then(
                            (result: any) => { //Recoger el resultado de la peticion ajax, actualizamos el localstorage
                                this.user.image = result.image; //no va a llegar un objeto con la imagen nueva del usuario
                                localStorage.setItem('identity', JSON.stringify(this.user));//actulizamos identity en localstorage
                                console.log(this.user);
                            }
                        );
                    }
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


    //Metodo que se lanzara en el evento del input de seleccion de archivo
    //vamos a recivir la informacion target a subir

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any) {
        //recoge los archivos que se han seleccionados en el input
        this.filesToUpload = <Array<File>>fileInput.target.files; 

    }
    //Se hara peticion ajax para subir ficheros convencionales
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        var token = this.token;

        //Promise: lanzar el codigo de la subida
        return new Promise(function (resolve, reject) {

            var formData: any = new formData();//Para simular el comportamiento de un form normal
            var xhr = new XMLHttpRequest();//La peticion de ajax tipica

            //Recorremos los ficheros que recivamos por el array para anadirlos al formData
            for (var i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);//insertar cada uno de los ficheros
            }
            //Comprovamos que le peticion esta lista para hacerla  
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }

}