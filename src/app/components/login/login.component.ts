import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService) { }

  ngOnInit() {
  }

  OturumAc(kadi: string, parola: string) {
    this.apiServis.Giris(kadi, parola).subscribe((d: any) => {
      localStorage.setItem("token", d.access_token);
      localStorage.setItem("uid", d.uyeId);
      localStorage.setItem("kadi", d.uyeKadi);
      localStorage.setItem("uyeYetkileri", d.uyeYetkileri);
      location.href = "/";
    }, err => {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Kullanıcı Adı veya Parola Geçersizdir!";
      this.alert.AlertUygula(s);
    });
  }

}
