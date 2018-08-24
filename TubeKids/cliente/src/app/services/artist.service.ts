import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';


//Nos permite injectar este servicio a otros componenstes
@Injectable()
export class ArtistService { //export, permite usarla fuera de la clase
    public url: string; // Guardaremos la url de nuestra apirest
    constructor(private _http: Http) { //para poder usar el servicio http inyectamos la dependencia para poder usar todos sus metodos
        this.url = GLOBAL.url;
    }

    getArtists(token, page) {
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });//con esto se puede pasar el content type la athorization
        return this._http.get(this.url + 'artists/' + page, options)
            .map(res => res.json());
    }

    getArtist(token, id: string) {
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });//con esto se puede pasar el content type la athorization
        return this._http.get(this.url + 'artist/' + id, options)
            .map(res => res.json());
    }

    addArtist(token, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'artist', params, { headers: headers })
            .map(res => res.json());
    }
    editArtist(token, id: string, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + 'artist/' + id, params, { headers: headers })
            .map(res => res.json());
    }
    deleteArtist(token, id: string) {
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + 'artist/' + id, options)
            .map(res => res.json());
    }
}