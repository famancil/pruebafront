import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject('BACKEND_API_URL') private URL: string,
    private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<any>( this.URL + '/users').toPromise();
  }

  saveUser(user: any){
    return this.httpClient.post(this.URL+'users/',user).toPromise(); 
  }
}
