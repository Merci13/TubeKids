import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componenstes user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
//Component Artista
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artis-edit.component';

//Component video
import { VideoAddComponen } from './components/video-add.component';
//Rutas donde se llevaran todos
//Vamos a difinir un array con la configuracion de cada una de la rutas de la app
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'artistas/:page', component: ArtistListComponent },
    { path: 'editar-artista/:id', component: ArtistEditComponent },
    { path: 'create-artista', component: ArtistAddComponent },
    { path: 'mis-datos', component: UserEditComponent },
   // { path: 'mis-datos', component: UserEditComponent },
   { path: 'crear-video/:page', component: VideoAddComponen },
    { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = []; //Exportamos como servicio 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//