import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componenstes user
import { UserEditComponent } from './components/user-edit.component';

//Vamos a difinir un array con la configuracion de cada una de la rutas de la app
const appRoutes: Routes = [
    {path: '', component: UserEditComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: UserEditComponent},
];

export const appRoutingProviders: any[] = []; //Exportamos como servicio 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//