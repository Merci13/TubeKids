import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MessageService {
constructor(private _http: HttpClient) { }

//recibe como parámetro un objeto, este objeto son los datos envíado desde el formulario de contacto.
sendMessage(email) {
console.log('http://localhost:3977/api/formulario/'+email);
 return this._http.post('http://localhost:3977/api/formulario/'+email, email);
 }
}