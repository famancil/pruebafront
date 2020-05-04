import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    @Inject('BACKEND_API_URL') private URL: string,
    private httpClient: HttpClient) { }

  getUsuarios() {
    return this.httpClient.get<any>( this.URL + '/users').toPromise();
  }
}
