import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';
import { Video } from '../models/video';
import { DomSanitizer } from '@angular/platform-browser';
import { Perfil } from '../models/perfil';
import { VideoP } from '../models/videoperfil';


@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})
export class HomeComponent implements OnInit {
    public titulo: string;
    public token: string;
    public videos: Video[];
    private perfil: Perfil;
    private prof: boolean;
    private videoperfil: VideoP
    private perfiles: Perfil[];


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private artistService: ArtistService,
        private sanitizer: DomSanitizer
    ) {
        this.titulo = 'Home';
        this.token = localStorage.getItem("token");
        this.videos = [];

        this.perfiles = [];
        this.videoperfil = new VideoP;

    }
    ngOnInit() {
        this.perfil = JSON.parse(localStorage.getItem("perfil"));
        console.log('home.component.ts cargado');
        this.cargarVideos();
        this.cagarperfiles();

        if (this.perfil != null) {
            this.cargarVideoP();
        }

    }
    // Traigo los videos en general y los anado a una lista
    cargarVideos() {
        this.artistService.getVideos(this.token)
            .subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    this.videos.push(res[i]);
                }

            });
    }
    // Metodo para editar los videos 
    update(video: Video) {
        //Si el perfil es null, quiere decir que puede editar el video, pero si esta con el perfil esto no es permitido.
        if (this.perfil == null) {
            localStorage.setItem("videoEdit", JSON.stringify(video));
            window.location.href = '../crear-video/1'
        } else {
            alert("Lo siento " + this.perfil.name + " no puedes editar videos");
        }

    }
    //Metodo para eliminar video, igual se pregunta que si el perfil tiene algo para que no lo deje eliminar..
    deleteVideo(video: Video) {
        if (this.perfil == null) {
            this.artistService.deleteVideo(video, this.token)
                .subscribe(res => {
                    alert("Eliminaste el video: " + video.name)
                    window.location.href = '../home';
                });
        } else {
            alert("Lo siento " + this.perfil.name + " no puedes borrar videos");
        }

    }
    // Metodo para agregar video, se manda el perfil al que se le va a anadir 
    //Y se le manda el video que se va a guardar
    addVideoP(video: Video, perfil: Perfil) {
        if (this.perfil == null) {
            this.videoperfil.userId = perfil._id;
            this.videoperfil.videoId = video._id;
            this.artistService.addVideoP(this.token, this.videoperfil)
                .subscribe(res => {
                    alert("Se anadio con exito");
                });
        } else {
            alert("No puedes anadir videos a otros perfiles");
        }

    }
    //Metodo para saber que perfiles tengo yo en mi cuenta
    cagarperfiles() {
        var user = JSON.parse(localStorage.getItem("identity"));
        this.artistService.getPerfil(this.token)
            .subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    //pregunta que si el id que traigo es igual al del padre que muestre los perfiles que tiene
                    if (res[i].userId == user._id) {
                        this.perfiles.push(res[i]);
                    }
                }
            })
    }
    // 
    cargarVideoP() {

        var list = [];
        this.artistService.getVideoP(this.token)
            .subscribe(res => {
                // Primer form para obtener el id del perfil al que se le piensa obtener los videos
                for (let i = 0; i < res.length; i++) {
                    if (res[i].userId == this.perfil._id) {
                        //Se recorre toda la base de datos de los videos y se obtienen los videos segun el id del 
                        //del perfil obtenido
                        for (let index = 0; index < this.videos.length; index++) {
                            if (res[i].videoId == this.videos[index]._id) {
                                list.push(this.videos[index]);

                            }

                        }
                    }
                }
                this.videos = list;
            });
    }

}