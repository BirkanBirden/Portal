import { Arac } from './../../models/Arac';
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
import { UyesecDialogComponent } from '../dialogs/uyesec-dialog/uyesec-dialog.component';

@Component({
  selector: 'app-uyeliste',
  templateUrl: './uyeliste.component.html',
  styleUrls: ['./uyeliste.component.css']
})
export class UyelisteComponent implements OnInit {

  kayitlar: Kayit[];
  aracId: number;
  secArac: Arac;
  displayedColumns = ['uyeAdSoyad', 'uyeTel', 'uyeMail', 'uyeSifre', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UyesecDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.aracId = p.aracId;
      this.AracById();
      this.kayitListele();
    });
  }
  kayitListele() {
    this.apiServis.AracUyeListe(this.aracId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  AracById() {
    this.apiServis.AracById(this.aracId).subscribe((d: Arac) => {
      this.secArac = d;
    });
  }
  Ekle() {
    this.dialogRef = this.matDialog.open(UyesecDialogComponent, {
      width: '800px'
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitAracId = this.aracId;
        kayit.kayitUyeId = d.uyeId;
        this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.kayitListele();
          }
        });
      }

    });

  }
  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.confirmDialogRef.componentInstance.dialogMesaj = " Kaydı Silmek İstiyormusunuz";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.kayitListele();
          }
        });
      }
    });
  }
}
