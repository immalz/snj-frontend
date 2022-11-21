
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modulos
import { MaterialModule } from './material/material.module';
import { AlumnoModule } from './routes/alumno/alumno.module';
import { SharedModule } from './routes/shared/shared.module';
import { AuthModule } from './routes/auth/auth.module';
import { ProfesorModule } from './routes/profesor/profesor.module';
import { AdministradorModule } from './routes/administrador/administrador.module';
import { TokenInterceptorService } from './routes/auth/services/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AlumnoModule,
    ProfesorModule,
    AuthModule,
    AdministradorModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    // {
    //   provide: LOCALE_ID, useValue: 'es'
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
