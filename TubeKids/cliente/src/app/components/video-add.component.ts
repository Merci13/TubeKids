import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global'
import { Video } from '../models/video';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';

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
  videoAdd: Video;

  //Cargaremos el servicio
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
  ) {

    this.titulo = "Crear un nuevo video";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.video = new Video();

    if (!(localStorage.getItem("videoEdit") == undefined || localStorage.getItem("videoEdit") == null)) {
      this.video = JSON.parse(localStorage.getItem("videoEdit"));
    }

  }
  Validar() {

    if (!(this.video.name === "" || this.video.name == undefined || this.video.name == null || this.video.name === " ")) {
      if (!(this.video.file === "" || this.video.file == undefined || this.video.file == null || this.video.file === " ")) {
        var ext_split = this.video.file.split('='); //se recorta para obtner la extencion del archivo
        var file = ext_split[1]; //se recoje el campo 2. porque ahi esta la extencion despues del split video de youtube
        this.video.file = "https://www.youtube.com/embed/" + file;


        return true;
      } else {
        alert("El URL es requerido");
      }
    } else {
      alert("El Nombre del video es requerido");
    }

  }

  evento() {
    var pefil =  localStorage.getItem("perfil");
    if(pefil == null){
      if (this.Validar()) {
        if (this.video._id == undefined) {
          this._artistService.addVideo(this.token, this.video)
            .subscribe(res => {
              this.video = new Video();
              alert("Video Registrado");
  
            });
        } else {
          this._artistService.updateVideo(this.video, this.token)
            .subscribe(res => {
              this.video = new Video();
              alert("Video Actualizado");
              localStorage.setItem("videoEdit", "");
  
            });
  
        }
      }
    }else{
      alert("No tienes permisos");
    }
   
  }


  ngOnInit() {
    console.log('video-add.components.ts cargado');
  }
  

}