import { ApiService } from './../service/api.service';
import { Component, OnInit, VERSION, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

interface Company {
  Si: number;
  Token: number;
  Pvalue: number;
  C_id: number;
  Status: string;
  Script: string;
}

export class CsvData {
  public Si: number;
  public Token: number;
  public Pvalue: number;
  public C_id: number;
  public Status: string;
  public Script: string;
}
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  name = 'Angular ' + VERSION.major;
  public records: Company[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;

  modal = false;
  selected: any;

  public columns: Columns[] = [
    { key: 'Si', title: 'Si' },
    { key: 'Token', title: 'Token' },
    { key: 'Pvalue', title: 'pvalue' },
    { key: 'C_id', title: 'C_id' },
    { key: 'Status', title: 'Status' },
    { key: 'Script', title: 'Script' },
  ];

  data: Company[] = [];
  public configuration: Config;

  // name = environment.application.name;
  version = environment.application.version;
  bootstrap = environment.application.bootstrap;
  fontawesome = environment.application.fontawesome;

  book_list_count: number = 0;
  book_store_count: number = 0;
  book_distri_count: number = 0;
  user_count: number = 0;
  hiring_count: number = 0;
  hiring_count_active: number = 0;
  my_trans_count: number = 0;

  csvArr_try: Company[] = [];
  csvRecord: Company = null;
  constructor(private meta: Meta, public dialog: MatDialog, private ps: NgxPermissionsService,
    private snackBar: MatSnackBar, private rs: Router, public api: ApiService) {
    this.csvRecord = {
      Si: 0,
      Token: 0,
      Pvalue: 0,
      C_id: 0,
      Status: '',
      Script: ''
    };
  }




  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = [];

    this.meta.updateTag(
      {
        name: 'description',
        content: 'This application was developed with Angular version 14.2.5 and bootstrap 5.2.2' +
          ' It applies Routing, Lazy loading, Server side rendering and Progressive Web App (PWA)'
      });
  }

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.records);
        this.data = this.records;
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        console.log(curruntRecord[0].trim());
        const csvc = {
          Si: parseFloat(curruntRecord[0].trim()),
          Token: parseFloat(curruntRecord[1].trim()),
          Pvalue: parseFloat(curruntRecord[2].trim()),
          C_id: parseFloat(curruntRecord[3].trim()),
          Status: curruntRecord[4].trim(),
          Script: curruntRecord[5].trim(),
        };
        this.csvArr_try.push(csvc);
        console.log(this.csvArr_try, "156");
      }
    }
    return this.csvArr_try;
  }
  // getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
  //   let csvArr = [];

  //   for (let i = 1; i < csvRecordsArray.length; i++) {
  //     let curruntRecord = (<string>csvRecordsArray[i]).split(',');
  //     if (curruntRecord.length == headerLength) {
  //       let csvRecord: CsvData = new CsvData();
  //       csvRecord.Si = parseFloat(curruntRecord[0].trim());

  //       csvRecord.Token = parseFloat(curruntRecord[1].trim());


  //       csvRecord.Pvalue = parseFloat(curruntRecord[2].trim());
  //       csvRecord.C_id = parseFloat(curruntRecord[3].trim());
  //       csvRecord.Status = curruntRecord[4].trim();
  //       csvRecord.Script = curruntRecord[5].trim();
  //       csvArr.push(csvRecord);
  //     }
  //   }
  //   return csvArr;
  // }

  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }
  getJsonData() {
    this.jsondatadisplay = JSON.stringify(this.records);
  }
  onEvent(event: { event: string; value: any }): void {
    this.selected = JSON.stringify(event.value.row, null, 2);
  }

  showModal(): void {
    this.modal = true;
  }

  hideModal(): void {
    this.modal = false;
  }
  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];
    console.log(file);
  }

  
}


//address?: { street: string; number?: number };

