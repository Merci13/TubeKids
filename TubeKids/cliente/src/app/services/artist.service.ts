import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';
import { Video } from '../models/video';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../models/perfil';
import { VideoP } from '../models/videoperfil';


//Nos permite injectar este servicio a otros componenstes
@Injectable()
export class ArtistService { //export, permite usarla fuera de la clase
    public url: string; // Guardaremos la url de nuestra apirest
    constructor(private _http: Http , private http: HttpClient) { //para poder usar el servicio http inyectamos la dependencia para poder usar todos sus metodos
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
        return this._http.get(this.url + 'artists/' + id, options)
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
    // ********************************************VIDEOS*******************************************************
    addVideo(token, artist: Video) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'video', params, { headers: headers })
            .map(res => res.json());
    }

    getVideos(token: string) {
        return this.http.get<Video[]>('http://localhost:3977/api/videos',{headers: { Authorization: token}})
          .map(res => res);
      }

      updateVideo(video: Video,token : string) {
        return this.http.put(`http://localhost:3977/api/video/`+video._id, video ,{headers: { Authorization: token}})
          .map(res => res);
      }
      deleteVideo(video: Video,token : string) {
        return this.http.delete('http://localhost:3977/api/video/'+video._id ,{headers: { Authorization: token}})
          .map(res => res);
      }

    //***********************************************PERFILES************************************************************** */

    addPerfil(token, perfil: Perfil) {
        let params = JSON.stringify(perfil);
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this._http.post('http://localhost:3977/api/perfil', params, { headers: headers })
            .map(res => res.json());
    }

    getPerfil(token: string) {
        return this.http.get<Perfil[]>('http://localhost:3977/api/perfil',{headers: { Authorization: token}})
          .map(res => res);
      }

      updatePerfil(perfil: Perfil,token : string) {
        return this.http.put(`http://localhost:3977/api/perfil/`+perfil._id, perfil ,{headers: { Authorization: token}})
          .map(res => res);
      }
      deletePerfil(perfil: Perfil,token : string) {
        return this.http.delete('http://localhost:3977/api/perfil/'+perfil._id ,{headers: { Authorization: token}})
          .map(res => res);
      }

    //******************************************************Video Perfil ****************************************************/
    
    addVideoP(token, video: VideoP) {
        let params = JSON.stringify(video);
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this._http.post('http://localhost:3977/api/videoperfil', params, { headers: headers })
            .map(res => res.json());
    }

    getVideoP(token: string) {
        return this.http.get<VideoP[]>('http://localhost:3977/api/videoperfil',{headers: { Authorization: token}})
          .map(res => res);
      }






}