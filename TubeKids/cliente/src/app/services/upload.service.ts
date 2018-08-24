import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


//Nos permite injectar este servicio a otros componenstes
@Injectable()
export class uploadService { //export, permite usarla fuera de la clase
    public identity;
    public token;
    public url: string; // Guardaremos la url de nuestra apirest
    constructor(private _http: Http) { //para poder usar el servicio http inyectamos la dependencia para poder usar todos sus metodos
        this.url = GLOBAL.url;
    }
        //Se hara peticion ajax para subir ficheros convencionales
        makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string,name: string) {
            //Promise: lanzar el codigo de la subida
            return new Promise(function (resolve, reject) {
                var formData:any = new FormData();//Para simular el comportamiento de un form normal
                var xhr = new XMLHttpRequest();//La peticion de ajax tipica
    
                //Recorremos los ficheros que recivamos por el array para anadirlos al formData
                for (var i = 0; i < files.length; i++) {
                    formData.append(name, files[i], files[i].name);//insertar cada uno de los ficheros
                }
                //Comprovamos que le peticion esta lista para hacerla  
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                }
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Authorization', token);
                xhr.send(formData);
            });
        }
    
}