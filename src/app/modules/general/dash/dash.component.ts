import { ApiService } from './../service/api.service';
import {
  Component, OnInit, VERSION, ViewChild, ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig, } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
 

export interface Element {
 

  C_id: number;
  Si: number;
  Pvalue: number;
  Status: string;
  Script: string;
  Type: string;
  Current_value: number;
  Time: string;
}

const ELEMENT_DATA: Element[] = [
  {Si:2,C_id: 1, Pvalue: 44,Status: 'H',Script:'SBIN',Type:'High',Current_value: 100,Time:'10:00:00'},
];


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
 
interface Second {
  C_id: number;
  Si: number;
  Pvalue: number;
  Status: string;
  Script: string;
  Type: string;
  Current_value: number;
  Time: string;
}
 


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
 
})
export class DashComponent implements OnInit {

  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns = ['Si','C_id', 'Pvalue','Status','Script','Current_value','Time'];
  dataSource = new MatTableDataSource(null);


  

  
  name = 'Angular ' + VERSION.major;
  public records: Company[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;
  modal = false;
  selected: any;
  monitoring: boolean = false;
 
  public columns1: Columns[] = [
    { key: 'Si', title: 'Si' },
    { key: 'Pvalue', title: 'pvalue' },
    { key: 'Status', title: 'Status' },
    { key: 'Script', title: 'Script' },
    { key: 'C_id', title: 'C_id' },
    { key: 'Current_value', title: 'Current_value' },
    { key: 'Time', title: 'Time' },
 
  ];
 
  public columns: Columns[] = [
    { key: 'Si', title: 'Si' },
    { key: 'Token', title: 'Token' },
    { key: 'Pvalue', title: 'pvalue' },
    { key: 'C_id', title: 'C_id' },
    { key: 'Status', title: 'Status' },
    { key: 'Script', title: 'Script' },
  ];
 
  data1: Second[] = [];
  data: Company[] = [];
  public configuration: Config;
 
  monitoringInterval: any;
 
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
  randomValue: number = 0;
  csvArr_try: Company[] = [];
  csvRecord: Company = null;
  constructor(private meta: Meta, public dialog: MatDialog, private ps: NgxPermissionsService,
    private snackBar: MatSnackBar, private rs: Router, public api: ApiService, private cdr: ChangeDetectorRef, private toastr: ToastrService) {
    this.csvRecord = {
      Si: 0,
      Token: 0,
      Pvalue: 0,
      C_id: 0,
      Status: '',
      Script: ''
    };
    
    // Assign the data to the data source for the table to render

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
        //console.log(this.records);
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
     
        const csvc = {
          Si: parseFloat(curruntRecord[0].trim()),
          Token: parseFloat(curruntRecord[1].trim()),
          Pvalue: parseFloat(curruntRecord[2].trim()),
          C_id: parseFloat(curruntRecord[3].trim()),
          Status: curruntRecord[4].trim(),
          Script: curruntRecord[5].trim(),
        };
        this.csvArr_try.push(csvc);
       
      }
    }
    return this.csvArr_try;
  }
 
 
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
    this.csvArr_try = [];
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
 
 
 
 
 
 
 
 
  startMonitoring() {
    let index = 0;
    this.monitoring=true;
    const iterate = () => {
      if (index < this.records.length) {
        console.log(this.records[index].Pvalue);
        const Pvalue = this.records[index].Pvalue;
        // this.records[index].score = Math.floor(Math.random() * 100);
        // console.log("Updated index " + index  );
        // Generate a random number between 700 and 900
        // this.randomValue = Math.floor(Math.random() * (900 - 700 + 1)) + 700;
        const sample = {
          "exch_name": "NSE",
          "token": this.records[index].Token.toString(),
        }
        // this.api.g_q_shoonya(sample).subscribe((res: any) => {
        //   console.log(res);
        //  this.randomValue = res.data.lp;
        
        //   this.check_with(this.randomValue,Pvalue,index-1);
 
        // })
        this.check_with(250,Pvalue,index);
       
        index++;
        this.monitoringInterval = setTimeout(iterate, 10000);
      } else {
        // Reset index to 0 and repeat the iteration
        console.log("Updated index " + index);
        index = 0;
        this.monitoringInterval = setTimeout(iterate, 10000);
      }
    };
 
    // Start the initial iteration
    iterate();
  }
 
  check_with(randomValue: number,purchase_value:number,index:number): void {
 
    console.log("Random value:", this.randomValue);
    // Calculate the difference percentage
    const difference = Math.abs(this.randomValue - purchase_value) / purchase_value * 100;
    // Check if the difference is greater than or less than 10% of Pvalue
    if (difference > 10) {
      if (this.randomValue > purchase_value) {
        const curruntRecord3 = {
          Si: this.records[index].Si,
          Pvalue: this.records[index].Pvalue,
          C_id: this.records[index].C_id,
          Status: this.records[index].Status,
          Script: this.records[index].Script,
          Time: new Date().toLocaleString(),
          Type: 'High',
          Current_value: this.randomValue
        };
        this.data1.push(curruntRecord3);
        this.cdr.markForCheck();
        const audio = new Audio('../assets/mixkit-arabian-mystery-harp-notification-2489.wav');
        this.toastr.success(" Stock - "+this.records[index].Script+ " Triggered a (" + difference.toFixed(2) + "%) Higher value from the Purchase value For the client - "+this.records[index].C_id+ " ");
        audio.play();
      } else {
        const curruntRecord3 = {
          Si: this.records[index].Si,
          Pvalue: this.records[index].Pvalue,
          C_id: this.records[index].C_id,
          Status: this.records[index].Status,
          Script: this.records[index].Script,
          Time: new Date().toLocaleString(),
          Type: 'Low',
          Current_value: this.randomValue
        };
        this.data1.push(curruntRecord3);
        this.cdr.markForCheck();
        const audio = new Audio('../assets/mixkit-arabian-mystery-harp-notification-2489.wav');
       
        this.toastr.error(" Stock - "+this.records[index].Script+ " Triggered a (" + difference.toFixed(2) + "%) lower value from the Purchase value For the client - "+this.records[index].C_id+ " ");
        audio.play();
        this.dataSource = new MatTableDataSource(this.data1);
        // ngAfterViewInit() {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        // }
      }
    }
 
 
  }
  stopMonitoring() {
    clearTimeout(this.monitoringInterval);
    this.monitoring=false;
  }
 
 
 
 
 
  show() {
   
  }
 
}

const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

