import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { AracDialogComponent } from './../dialogs/arac-dialog/arac-dialog.component';
import { Arac } from './../../models/Arac';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Arac',
  templateUrl: './Arac.component.html',
  styleUrls: ['./Arac.component.css']
})
export class AracComponent implements OnInit {

  dataSource: any;
  araclar: Arac[];
  displayedColumns = ['aracPlaka', 'aracIsim', 'aracMarka', 'aracFiyatSaat', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialog: MatDialogRef<AracDialogComponent>;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.AracListele()
  }

  AracListele() {
    this.apiServis.AracListe().subscribe((d: Arac[]) => {
      this.araclar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AracEkle() {
    var yeniKayit: Arac = new Arac;
    this.dialog = this.matDialog.open(AracDialogComponent, {
      width: '300px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AracEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem)
            this.AracListele();
        });
      }
    })
  }

  Duzenle(kayit: Arac) {
    this.dialog = this.matDialog.open(AracDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {

        kayit.aracIsim = d.aracIsim,
          kayit.aracPlaka = d.aracPlaka,
          kayit.aracMarka = d.aracMarka,
          kayit.aracFiyatGün = d.aracFiyatGün,
          kayit.aracDetay = d.aracDetay,
          kayit.aracFiyatSaat = d.aracFiyatSaat,


          this.apiServis.AracDuzenle(kayit).subscribe((s: Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.AracListele();
            }
          })
      }
    });
  }


  Sil(kayit: Arac) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: "600px"
    });

    this.confirmDialog.componentInstance.dialogMesaj = kayit.aracPlaka + " plakalı araç silinecektir onaylıyor musunuz?";
    this.confirmDialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AracSil(kayit.aracId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        });
      }
    });
  }




}
