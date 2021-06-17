import { AracsecDialogComponent } from './../dialogs/aracsec-dialog/aracsec-dialog.component';
import { UyesecDialogComponent } from './../dialogs/uyesec-dialog/uyesec-dialog.component';
import { Arac } from './../../models/Arac';
import { Uye } from './../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from 'src/app/models/Kayit';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-aracListe',
  templateUrl: './aracListe.component.html',
  styleUrls: ['./aracListe.component.css']
})
export class AracListeComponent implements OnInit {

  kayitlar: Kayit[];
  uyeId: number;
  secUye: Uye;
  dataSource: any;
  displayedColumns = ['aracPlaka', 'aracIsim', 'aracMarka', 'aracFiyatSaat', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialog: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<AracsecDialogComponent>;

  constructor(
    public apiservis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.route.params.subscribe(d => {
      if (d) {
        this.uyeId = d.uyeId;
        this.UyeGetir();
        this.KayitListele();
      }
    });

  }
  KayitListele() {
    this.apiservis.UyeAracListe(this.uyeId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  UyeGetir() {
    this.apiservis.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.secUye = d;
    })
  }



  UyeById() {
    this.apiservis.AracById(this.uyeId).subscribe((d: Uye) => {
      this.secUye = d;
    });
  }
  Ekle() {
    this.dialogRef = this.matDialog.open(AracsecDialogComponent, {
      width: '800px'
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitAracId = d.aracId;
        kayit.kayitUyeId = this.uyeId;
        this.apiservis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }

    });

  }
  Sil(kayit: Kayit) {
    this.dialog = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.dialog.componentInstance.dialogMesaj = " Kaydı Silmek İstiyormusunuz";

    this.dialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiservis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }
}
