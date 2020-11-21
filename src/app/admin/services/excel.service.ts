import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const T = 'appliction/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

const EXCEL_EXT = '.xlsx';
@Injectable()
export class ExcelService {

  constructor() { }
  exportToExcel(json: any[], excelFilename: string): void{
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    this.saceAsExcel(excelBuffer, excelFilename);
  } 

  private saceAsExcel(buffer: any, filename: string): void{
    const data: Blob = new Blob([buffer], { type: T});
    FileSaver.saveAs(data, filename + '_export_' + EXCEL_EXT)
  }
}
