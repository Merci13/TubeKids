import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';

@NgModule({
  //Declaremos componentes y directivas
  declarations: [
    AppComponent,
    UserEditComponent //Esta forma se accede a su directiva dentro de cualquier otro componente 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    routing
  ],
  providers: [appRoutingProviders],
  //Dede donde cargamos la aplicacion
  bootstrap: [AppComponent]
})
export class AppModule { }
