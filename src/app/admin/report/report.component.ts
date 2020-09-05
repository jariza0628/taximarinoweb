import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../services/general-service.service';
import { Sales } from '../models/sales';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public data: Array<Sales>;

  pointsale: any;

  public date: any;
  public seller: any;

  public dataResult: any;

  public user: any;

  totalinforme: any;

  constructor(private _GeneralServiceService: GeneralServiceService) { }

  ngOnInit() {
    this.getseller();
    this.getData();
    this.getZones();
    this.totalinforme = 0;

  }


  getData() {
    this._GeneralServiceService.getFirebase('sales').subscribe(
      data => {
        // console.log('dara', data);
        this.data = data.map(e => {
          console.log(e.payload.doc.data());
          this.calc(e.payload.doc.data());

          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Sales;
        });
      });
  }

  getZones() {
    this._GeneralServiceService.getFirebase('pointsale').subscribe(
      data => {
        // console.log('dara', data);
        this.pointsale = data.map(e => {
          console.log(e.payload.doc.data());
          this.calc(e.payload.doc.data());

          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as any;
        });
      });
  }

  search(seller?, date?, zone?) {
    this.totalinforme = 0;
    this.data = [];
    date = date;

    console.log('seller', seller);
    console.log('date', date);

    if (seller && seller !== 'Selecciona un vendedor' && zone !== '') {

      this._GeneralServiceService.getSaleBydate('sales', 'seller', seller, 'zone', zone).subscribe(
        data => {
          // console.log('dara', data);
          this.data = data.map(e => {
            console.log('result', e.payload.doc.data());
            this.calc(e.payload.doc.data());

            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Sales;
          });
        });
    }

    if (seller && seller !== 'Selecciona un vendedor' && date !== '') {

      this._GeneralServiceService.getSaleBydate('sales', 'seller', seller, 'date', date).subscribe(
        data => {
          // console.log('dara', data);
          this.data = data.map(e => {
            console.log('result', e.payload.doc.data());
            this.calc(e.payload.doc.data());

            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Sales;
          });
        });
    }
    if (seller && seller !== 'Selecciona un vendedor' && date !== '' && zone !== '') {

      this._GeneralServiceService.getSaleBydate('sales', 'seller', seller, 'date', date, 'zone', zone).subscribe(
        data => {
          // console.log('dara', data);
          this.data = data.map(e => {
            console.log('result', e.payload.doc.data());
            this.calc(e.payload.doc.data());

            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Sales;
          });
        });
    } else {

      let col, data2;
      if (seller !== '' && seller !== 'Selecciona un vendedor') {
        col = 'seller';
        data2 = seller;

        this._GeneralServiceService.getSaleBydate('sales', 'seller', '' + data2).subscribe(
          data => {
            // console.log('dara', data);
            this.data = data.map(e => {
              console.log('result', e.payload.doc.data());
              this.calc(e.payload.doc.data());

              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Sales;
            });
          });
      }
      if (date !== '') {
        col = 'date';
        data2 = date;

        this._GeneralServiceService.getSaleBydate('sales', 'date', '' + data2).subscribe(
          data => {
            // console.log('dara', data);
            this.data = data.map(e => {
              console.log('result', e.payload.doc.data());
              this.calc(e.payload.doc.data());

              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Sales;
            });
          });

      }
      if (zone !== '' && zone !== 'Selecciona una zona') {
        col = 'zone';
        data2 = zone;

        this._GeneralServiceService.getSaleBydate('sales', 'zone', '' + data2).subscribe(
          data => {
            // console.log('dara', data);
            this.data = data.map(e => {
              console.log('result', e.payload.doc.data());
              this.calc(e.payload.doc.data());
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Sales;
            });
          });

      }



    }


  }

  calc(data) {
    console.log(data.total);
    this.totalinforme = this.totalinforme + data.total;
  }

  onSearchChange(value) {
    console.log('onSearchChange', value);

  }

  getseller() {
    this._GeneralServiceService.getFirebase('users').subscribe(
      data => {
        // console.log('dara', data);
        this.user = data.map(e => {
          console.log(e.payload.doc.data());
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Sales;
        });
      });
  }

}
