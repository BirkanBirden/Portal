import { LoginComponent } from './components/login/login.component';
import { AracsecDialogComponent } from './components/dialogs/aracsec-dialog/aracsec-dialog.component';
import { UyesecDialogComponent } from './components/dialogs/uyesec-dialog/uyesec-dialog.component';
import { UyelisteComponent } from './components/uyeliste/uyeliste.component';
import { UyeComponent } from './components/uye/uye.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { AracListeComponent } from './components/aracListe/aracListe.component';
import { AracComponent } from './components/Arac/Arac.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AracDialogComponent } from './components/dialogs/arac-dialog/arac-dialog.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    AracComponent,
    AracListeComponent,
    UyeComponent,
    UyelisteComponent,
    LoginComponent,


    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    AracDialogComponent,
    UyeDialogComponent,
    UyesecDialogComponent,
    AracsecDialogComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    AracDialogComponent,
    UyeDialogComponent,
    UyesecDialogComponent,
    AracsecDialogComponent

  ],
  providers: [MyAlertService, ApiService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
