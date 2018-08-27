import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Perfil } from '../models/perfil';

@Component({
    selector: 'artist-add',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit {
    public user: string;
    public pin: string;
    public token;
    public perfiles: Perfil[]


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        
      
    ) {
        this.perfiles = [];
        this.user ="";
        this.pin = "";
        this.token = localStorage.getItem("token");
       
    }
    ngOnInit() {
        console.log('artist-add.component.ts cargado');
    }


    Login() {
       
        var id;
        id = JSON.parse(localStorage.getItem("identity"));
      
        this._artistService.getPerfil(this.token)
            .subscribe(res => {
                var a = false;
                for (let i = 0; i < res.length; i++) { 
                    if (res[i].userId == id._id) {
                        if (res[i].username == this.user && res[i].pin == this.pin) {
                            alert("Logueado como: " + res[i].name);
                            localStorage.setItem("perfil", JSON.stringify(res[i]));
                            a = true;
                            window.location.href = '../';
                        }
                    }
                }
                if (!a) {
                    alert("Datos incorrectos")
                }
            });
    }

}