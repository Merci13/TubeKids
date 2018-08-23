import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componenstes user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';

//Vamos a difinir un array con la configuracion de cada una de la rutas de la app
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'artistas/:page', component: ArtistListComponent},
    {path: 'create-artista/:page', component: ArtistAddComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = []; //Exportamos como servicio 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//