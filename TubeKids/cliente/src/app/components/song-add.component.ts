import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Video } from '../models/video';
import { Album } from '../models/album';

@Component({
    selector: 'video-inicio',
    templateUrl: './views/video-add.html',
    providers: [UserService]
})
export class SongAddComponent implements OnInit {

    public titulo: string;
    public video: Video;
    public identity;
    public token;
    public url: string;
    public alertMessage;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {

        this.titulo = 'Crear un nuevo video';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.video = new Video(1,'','','','');
    }

    ngOnInit() {
        console.log('song cargada');
    }

}
