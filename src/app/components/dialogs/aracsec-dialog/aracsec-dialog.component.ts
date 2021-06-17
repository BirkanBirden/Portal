import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Arac } from 'src/app/models/Arac';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';


@Component({
  selector: 'app-aracsec-dialog',
  templateUrl: './aracsec-dialog.component.html',
  styleUrls: ['./aracsec-dialog.component.css']
})
export class AracsecDialogComponent implements OnInit {
  araclar: Arac[];

  dataSource: any;
  displayedColumns = ['aracPlaka', 'aracIsim', 'aracMarka', 'aracFiyatSaat', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<AracsecDialogComponent>
  ) { }

  ngOnInit() {
    this.AracListele();
  }

  AracListele() {
    this.apiServis.AracListe().subscribe((d: Arac[]) => {
      this.araclar = d;
      this.dataSource = new MatTableDataSource(this.araclar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  AracFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  AracSec(arac: Arac) {
    this.dialogRef.close(arac);
  }

}