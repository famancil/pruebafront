import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './views/private/users/list-user/list-user.component';

import{ UserService } from './providers/services/usuario/user.service';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    { provide: 'BACKEND_API_URL', useValue: environment.apiEndpoint }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
