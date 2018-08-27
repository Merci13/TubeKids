import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtistEditComponent } from './components/artis-edit.component';
import { VideoAddComponen } from './components/video-add.component';
import { ArtistService } from './services/artist.service';

// import { VideoAddComponent } from './components/';


@NgModule({
  //Declaremos componentes y directivas
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent, //Esta forma se accede a su directiva dentro de cualquier otro componente 
    ArtistListComponent,
    ArtistEditComponent,
    ArtistAddComponent,
    VideoAddComponen
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule, 
    routing
  ],
  providers: [appRoutingProviders,
  ArtistService],
  //Dede donde cargamos la aplicacion
  bootstrap: [AppComponent]
})
export class AppModule { }
