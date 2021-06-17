
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arac } from '../models/Arac';
import { Kayit } from '../models/Kayit';
import { Uye } from '../models/Uye';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44355/api/";

  constructor(
    public http: HttpClient
  ) { }

  //----------------------Oturum İşlemleri Başlıngıcı--------------------------------//

  Giris(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }

  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }
  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));
    var sonuc: boolean = false;
    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
      });

    }

    return sonuc;
  }


  //----------------------Oturum İşlemleri Bitişi--------------------------------//


  //----------------------Üye Servis Başlıngıcı--------------------------------//

  UyeListe() {
    return this.http.get(this.apiUrl + "uyeliste");
  }

  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + "uyebyid/" + uyeId);
  }

  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "uyeekle", uye);
  }

  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "uyeduzenle", uye);
  }

  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "uyesil/" + uyeId);
  }


  //----------------------Üye Servis Bitişi--------------------------------//

  //----------------------Araç Servis Başlangıcı--------------------------------//

  AracListe() {
    return this.http.get(this.apiUrl + "aracliste");
  }

  AracById(aracId: number) {
    return this.http.get(this.apiUrl + "aracbyid/" + aracId);
  }

  AracEkle(arac: Arac) {
    return this.http.post(this.apiUrl + "aracekle", arac);
  }

  AracDuzenle(arac: Arac) {
    return this.http.put(this.apiUrl + "aracduzenle", arac);
  }

  AracSil(aracId: number) {
    return this.http.delete(this.apiUrl + "aracsil/" + aracId)
  }

  //----------------------Ders Servis Bitişi--------------------------------//

  //----------------------Kayit Servis Başlangıcı--------------------------------//

  UyeAracListe(uyeId: number) {
    return this.http.get(this.apiUrl + 'uyearacliste/' + uyeId)
  }

  AracUyeListe(aracId: number) {
    return this.http.get(this.apiUrl + 'aracuyeliste/' + aracId)
  }

  KayitEkle(kayit: Kayit) {
    return this.http.post(this.apiUrl + 'kayitekle', kayit)
  }

  KayitSil(kayitId: number) {
    return this.http.delete(this.apiUrl + 'kayitsil/' + kayitId)
  }




  //----------------------Kayit Servis Bitişi--------------------------------//


}
