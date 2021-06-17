import { LoginComponent } from './components/login/login.component';
import { UyeComponent } from './components/uye/uye.component';
import { AracListeComponent } from './components/aracListe/aracListe.component';
import { AracComponent } from './components/Arac/Arac.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UyelisteComponent } from './components/uyeliste/uyeliste.component';
import { AuthGuard } from './services/AuthGuard';


const routes: Routes = [
  { path: '', component: AracComponent },
  { path: 'arac', component: AracComponent },
  {
    path: 'uye', component: UyeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/login"
    }
  },
  {
    path: 'uyeliste/:aracId', component: UyelisteComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/login"
    }
  },
  {
    path: 'aracliste/:uyeId', component: AracListeComponent, canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/login"
    }
  },
  { path: 'login', component: LoginComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
