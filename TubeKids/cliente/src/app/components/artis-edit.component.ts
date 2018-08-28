import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { uploadService } from '../services/upload.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';

@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService, uploadService]
})
export class ArtistEditComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: uploadService,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Crear un nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.is_edit = true;

    }
    ngOnInit() {
        console.log('artist-edit.component.ts cargado');
        //Llamar al metodo del api para sacar un artista en base a su id

        this.getArtist();
    }
    //Metodo para o
    getArtist() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    this.artist = response.artist;
                    if (!response.artist) {
                        this._router.navigate(['/']);
                    } else {
                        this.artist = response.artist;
                    }
                },
                error => {
                    var alertMessage = <any>error;
                    if (alertMessage != null) {
                        var body = JSON.parse(error._body) //convertimos el texto en un obj json
                        // this.alertMessage = body.message;
                        console.log(error);
                    }
                }
            );
        });
    }

    onSubmit() {
        console.log(this.artist);

        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.editArtist(this.token, id, this.artist).subscribe(
                response => {
                    this.artist = response.artist;
                    if (!response.artist) {
                        this.alertMessage = 'error en el servidor';
                    } else {
                        this.alertMessage = 'El artista se ha actualizado correctamente';

                        //subir la imagen del artista
                        this._uploadService.makeFileRequest(this.url + 'upload-image-artist/' + id, [], this.filesToUpload, this.token, 'image')
                            .then(
                                (result) => {
                                    this._router.navigate(['/artistas', 1]);
                                },
                                (error) => {
                                    console.log(error)
                                }
                            );

                        //  this.artist = response.artist;
                        //   this._router.navigate(['/editar-artista', response.artist._id]);
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
        });
    }
    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}