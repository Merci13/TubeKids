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

    evento() {
        var pefil =  localStorage.getItem("perfil");
        if(pefil == null){
       var user = JSON.parse(localStorage.getItem("identity"));
        if (this.current_perfil._id == undefined) {
            
            this.current_perfil.userId = user._id;
            this._artistService.addPerfil(this.token, this.current_perfil)
                .subscribe(res => {
                    this.current_perfil = new Perfil();
                   alert("Perfil Registrado");
                   this.ngOnInit();
                });
        } else {
            this._artistService.updatePerfil(this.current_perfil, this.token)
                .subscribe(res => {
                    this.current_perfil = new Perfil();
                    alert("Perfil Actualizado");
                });
        }

    }else{
        alert("No tienes permisos");
    }
    }

    getPerfiles() {
        this.perfiles = [];
        var user;
        user = JSON.parse(localStorage.getItem("identity"));
        this._artistService.getPerfil(this.token)
            .subscribe(res => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].userId == user._id) {
                        this.perfiles.push(res[i]);
                    }

                }
            });
    }

    borrarPerfil(perfil: Perfil){
        var pefil =  localStorage.getItem("perfil");
        if(perfil === null){
            this._artistService.deletePerfil(perfil,this.token)
            .subscribe(res=>{
                this.ngOnInit();
                    alert("El Perfil "+perfil.name+" ha sido borrado");
            });

        }else{
            alert("No tiene permisos..");
        }
        
    }

    editar(perfil : Perfil){
        this.current_perfil = perfil;
    }




}