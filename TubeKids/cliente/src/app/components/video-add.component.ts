import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global'
import { Video } from '../models/video';
import { ActivatedRoute, Router } from '@angular/router';

//Usamos el componet para indicar los metadatos que va a tener este componente
//y las caracteristicas
@Component({
    selector: 'video-add', //Etiqueta del componente
    templateUrl: '../views/video-add.html', // la vista de este componente estara en este fichero
    providers: [UserService] //para cargar los servicios
})
//Es necesario el metodo OnInit ya que es muy util
export class VideoAddComponen implements OnInit {
    public titulo: string;
    public video: Video; //Video que vamos a cargar
    public identity;
    public token;
    public alertMessage;
    public url: string;

    //Cargaremos el servicio
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {

        this.titulo = "Crear un nuevo video";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.video = new Video(1,'','','','');
    }

    ngOnInit() {
        console.log('video-add.components.ts cargado');
    }
    // onSubmit() {
    //     console.log(this.user);
    //     this._userService.update_user(this.user).subscribe(
    //         response => {
    //             this.user = response.user; //El valor nuevo lo asignamos a la propiedad user 
    //             if (!response.user) {
    //                 this.alertMessage = 'EL usuario no se ha actualizado';
    //             } else {
    //                 // this.user = response.user;
    //                 localStorage.setItem('identity', JSON.stringify(this.user));//actulizamos identity en localstorage

    //                 document.getElementById("identity_name").innerHTML = this.user.name;
    //                 if (!this.filesToUpload) {
    //                     //Si el metodo filesToUpload tiene contenido
    //                     this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload).then(
    //                         (result: any) => { //Recoger el resultado de la peticion ajax, actualizamos el localstorage
    //                             this.user.image = result.image; //no va a llegar un objeto con la imagen nueva del usuario
    //                             localStorage.setItem('identity', JSON.stringify(this.user));//actulizamos identity en localstorage
    //                             console.log(this.user);
    //                         }
    //                     );
    //                 }
    //                 this.alertMessage = 'EL usuario se ha actualizado';
    //             }
    //         },
    //         error => {
    //             var alertMessage = <any>error;
    //             if (alertMessage != null) {
    //                 var body = JSON.parse(error._body) //convertimos el texto en un obj json
    //                 this.alertMessage = body.message;
    //                 console.log(error);
    //             }
    //         }

    //     );
    // }


}