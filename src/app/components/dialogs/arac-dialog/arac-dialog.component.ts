import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Arac } from 'src/app/models/Arac';

@Component({
  selector: 'app-arac-dialog',
  templateUrl: './arac-dialog.component.html',
  styleUrls: ['./arac-dialog.component.css']
})
export class AracDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Arac;
  frm: FormGroup;


  constructor(
    public dialog: MatDialogRef<AracDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmbuilder: FormBuilder,

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = "Araç Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Araç Düzenle";
    }
    this.frm = this.FormOlustur();
  }


  ngOnInit() {
  }


  FormOlustur() {
    return this.frmbuilder.group({

      aracPlaka: [this.yeniKayit.aracPlaka],
      aracDetay: [this.yeniKayit.aracDetay],
      aracFiyatGün: [this.yeniKayit.aracFiyatGün],
      aracFiyatSaat: [this.yeniKayit.aracFiyatSaat],
      aracIsim: [this.yeniKayit.aracIsim],
      aracMarka: [this.yeniKayit.aracMarka],


    });
  }

}
