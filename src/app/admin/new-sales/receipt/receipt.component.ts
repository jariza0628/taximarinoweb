import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {Tickets} from '../../../../utils/ticket';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  user: any;
  @Input() data: any;
  @Output() hiddem = new EventEmitter();
  ticket = new Tickets();
  barcodes: any;
  total: any;
  constructor() { }

  ngOnInit() {
    this.total = 0;
    this.barcodes = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log('data compo', this.data);
  }

  lodadata() {
    this.barcodes = this.data.codes;
  }



  generarPDF() {
    this.ticket.pdf({}, [])
    // html2canvas(document.getElementById('modalPrint'), {
    //   // Opciones
    //   allowTaint: true,
    //   useCORS: false,
    //   // Calidad del PDF
    //   scale: 2
    // }).then(function (canvas) {
    //   // debugger
    //   const clientHeight = document.getElementById('modalPrint').clientHeight;
    //
    //   const img = canvas.toDataURL('image/png');
    //   const doc = new jspdf('p', 'px', [(clientHeight / 2), 110]);
    //   doc.addImage(img, 'PNG', 5, 2, 70, 140);
    //   doc.save('factura.pdf');
    // });


    this.lanzar();
  }

  lanzar() {
    // Usamos el método emit
    this.hiddem.emit();
  }

}
