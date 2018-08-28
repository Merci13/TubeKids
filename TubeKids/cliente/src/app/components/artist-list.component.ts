import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Perfil } from '../models/perfil';
import { User } from '../models/user';

@Component({
    selector: 'artist-list',
    templateUrl: '../views/artist-list.html',
    providers: [UserService, ArtistService]
})
export class ArtistListComponent implements OnInit {
    public token;
    public current_perfil: Perfil;
    perfiles: Perfil[];


    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _artistService: ArtistService) {
        this.current_perfil = new Perfil();
        this.perfiles = [];
        this.token = localStorage.getItem("token");
    }
    ngOnInit() {
        this.getPerfiles();
    }
    //Evento para anadir un perfil nuevo o actualizarlo..
    evento() {
        var pefil = localStorage.getItem("perfil");
        //Si perfil viene null puedo hacer lo que sea, si viene un perfil dentro no hay permisos validados.
        if (pefil == null) {
            var user = JSON.parse(localStorage.getItem("identity"));
            //Si el perfil es indefinido se puede generar un perfil
            if (this.current_perfil._id == undefined) {

                this.current_perfil.userId = user._id;
                this._artistService.addPerfil(this.token, this.current_perfil)
                    .subscribe(res => {
                        this.current_perfil = new Perfil();
                        alert("Perfil Registrado");
                        this.ngOnInit();
                    });
                //si no lo puede editar
            } else {
                this._artistService.updatePerfil(this.current_perfil, this.token)
                    .subscribe(res => {
                        this.current_perfil = new Perfil();
                        alert("Perfil Actualizado");
                    });
            }

        } else {
            alert("No tienes permisos");
        }
    }
    //Metodo  para obtener los perfiles que esten en la base de datos
    getPerfiles() {
        this.perfiles = [];
        var user;
        user = JSON.parse(localStorage.getItem("identity"));
        this._artistService.getPerfil(this.token)
            .subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].userId == user._id) {
                        //Se obtienen todos los perfiles, sepregunta si es este perfil es de la cuenta del padre 
                        //y se anade a la lista con el push..
                        this.perfiles.push(res[i]);
                    }

                }
            });
    }
    //
    borrarPerfil(perfil: Perfil) {
        var pefil = localStorage.getItem("perfil");
        //Por parametros se envia el perfil que va a ser eliminado..
        if (perfil === null) {
            this._artistService.deletePerfil(perfil, this.token)
                .subscribe(res => {
                    this.ngOnInit();
                    alert("El Perfil " + perfil.name + " ha sido borrado");
                });

        } else {
            alert("No tiene permisos..");
        }

    }

    editar(perfil: Perfil) {
        this.current_perfil = perfil;
    }

}