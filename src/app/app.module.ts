import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './views/private/users/list-user/list-user.component';

import{ UsuarioService } from './providers/services/usuario/usuario.service';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UsuarioService,
    { provide: 'BACKEND_API_URL', useValue: environment.apiEndpoint }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
