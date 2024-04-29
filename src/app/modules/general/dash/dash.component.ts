import { ApiService } from './../service/api.service';
import {
  Component, OnInit, VERSION, ViewChild, ChangeDetectionStrategy,
  ChangeDetectorRef,ElementRef
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

import * as Papa from 'papaparse';


export interface Element {

  Client_code: number;
  Si: number;
  avg_purchase_value: number;
  Status: string;
  Script: string;
  Type: string;
  Current_value: number;
  percentage: number;
  Time: string;
}

const ELEMENT_DATA: Element[] = [
  {Si:2,Client_code: 1, avg_purchase_value: 44,Status: 'H',Script:'SBIN',Type:'High',Current_value: 100,
   percentage: 0, Time:'10:00:00'},
];


interface Company {
  Si: number;
  Token: number;
  avg_purchase_value: number;
  Client_code: string;
  Client_name: string;
  Status: string;
  Script: string;
}
 
 
 
export class CsvData {
  public Si: number;
  public Token: number;
  public avg_purchase_value: number;
  public Client_code: string;
  public Client_name: string;
  public Status: string;
  public Script: string;
}
 
interface Second {
  Client_code: string;
  Si: number;
  avg_purchase_value: number;
  Status: string;
  Script: string;
  Type: string;
  Current_value: number;
  percentage: number;
  Time: string;
}
 
interface  Stock_list {
  Exchange: string,
  Token: number,
  LotSize : number,
  Symbol: string,
  TradingSymbol : string,
  Instrument : string,
  TickSize : number
}


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
 
})
export class DashComponent implements OnInit {

  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns = ['Si','Client_code', 'avg_purchase_value','Status','Script','Current_value','percentage','Time'];
  dataSource = new MatTableDataSource(null);

  papa_ary : any [] =[];

  

  
  name = 'Angular ' + VERSION.major;
  public records: Company[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;
  modal = false;
  selected: any;
  monitoring: boolean = false;
 
  public columns1: Columns[] = [
    { key: 'Si', title: 'Si' },
    { key: 'avg_purchase_value', title: 'avg_purchase_value' },
    { key: 'Status', title: 'Status' },
    { key: 'Script', title: 'Script' },
    { key: 'Client_code', title: 'Client_code' },
    { key: 'Current_value', title: 'Current_value' },
    { key: 'Time', title: 'Time' },
 
  ];
 
  public columns: Columns[] = [
    { key: 'Si', title: 'Si' },
    { key: 'avg_purchase_value', title: 'avg_purchase_value' },
    { key: 'Client_code', title: 'Client_code' },
    { key: 'Client_name', title: 'Client_name' },
    { key: 'Script', title: 'Script' },
  ];
 
  data1: Second[] = [];
  data: Company[] = [];
  public stock_list : Stock_list[] = [];
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
      avg_purchase_value: 0,
      Client_code: '',
      Client_name: '',
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
 
      


      this.api.getData_stock_list().subscribe(data =>{
        
      this.stock_list = data;

    
        
      })
 
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

       

        const parsedData = Papa.parse(csvData, {
          header: false
        });
        console.log('papa',parsedData);

        this.papa_ary = parsedData.data;

     


     //   this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        // console.log(this.records);
           
        for (let i = 1; i < parsedData.data.length; i++) 
          {
            const curruntRecord = this.papa_ary[i];    
           
               

                if(curruntRecord[4] > 0)
                  {
                    const currunttoken = this.ch_sample(curruntRecord[3].trim().replace(/\s+EQ$/, ''));
                    console.log(currunttoken,'currunt token'); 

                    const csvc = {
                      Si:i,
                      Token: currunttoken,
                      avg_purchase_value: parseFloat(curruntRecord[8].trim()),
                      Client_code: curruntRecord[1].trim(),
                      Client_name: curruntRecord[41].trim(),
                      Status: 'f',
                      Script: curruntRecord[3].trim(),
                    };
                    console.log(csvc,'csvc');
                    this.csvArr_try.push(csvc);

                  }
         




            // for (let j = i; j < curruntRecord.length; j++) 
            //   {
            //     const curruntRecordx = this.ch_sample(curruntRecord[3].trim().replace(/\s+EQ$/, ''));
                
              
            //   }

           //  const yoken = curruntRecord[0].trim().replace(/\s+EQ$/, '');     
            // const csvc = {
            //   Si:i,
            //   Token:  this.ch_sample(yoken),
            //   avg_purchase_value: parseFloat(curruntRecord[8].trim()),
            //   Client_code: curruntRecord[1].trim(),
            //   Client_name: curruntRecord[8].trim(),
            //   Status: 'f',
            //   Script: curruntRecord[3].trim(),
            // };
            // this.csvArr_try.push(csvc);
            
          }

          this.records = this.csvArr_try;
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

  preprocessHeaders(csvData: string): string {
    const lines = csvData.split('\n');
    if (lines.length > 0) {
      const headers = lines[0].split(',');
      const processedHeaders = headers.map(header => header.trim().replace(/\s+/g, '_'));
      lines[0] = processedHeaders.join(',');
    }
    return lines.join('\n');
  }



 
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {


   

    // for (let i = 1; i < csvRecordsArray.length; i++) 
    for (let i = 1; i < 2; i++) 
    {

console.log('csv array ..',csvRecordsArray[i])


   let currentRecordx = csvRecordsArray[i];
    let quotedData = currentRecordx.match(/"([^"]*)"/g);

   
        let curruntRecord = (<string>csvRecordsArray[i]).split(',');
    
       
      // console.log(curruntRecord,"249")
      // console.log(headerLength,"250")
      // console.log(curruntRecord.length,"251")


      if (curruntRecord.length == headerLength) {     
       const yoken = curruntRecord[0].trim().replace(/\s+EQ$/, '');     
        const csvc = {
          Si:i,
          Token:  this.ch_sample(yoken),
          avg_purchase_value: parseFloat(curruntRecord[8].trim()),
          Client_code: curruntRecord[1].trim(),
          Client_name: curruntRecord[8].trim(),
          Status: 'f',
          Script: curruntRecord[3].trim(),
        };
        this.csvArr_try.push(csvc);
       
      }

    
    }
    console.log(this.csvArr_try,"259");
    return this.csvArr_try;
  }
 
 
  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
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
        console.log(this.records[index].avg_purchase_value);
        const avg_purchase_value = this.records[index].avg_purchase_value;
      
        // this.randomValue = Math.floor(Math.random() * (900 - 700 + 1)) + 700;
        const sample = {
          "exch_name": "NSE",
          "token": this.records[index].Token.toString(),
        }
        this.api.g_q_shoonya(sample).subscribe((res: any) => {
          console.log(res);
         this.randomValue = res.data.lp;
        
          this.check_with(this.randomValue,avg_purchase_value,index-1);
 
        })
        
       
        index++;
        this.monitoringInterval = setTimeout(iterate, 1000);
      } else {
        // Reset index to 0 and repeat the iteration
        console.log("Updated index " + index);
        index = 0;
        this.monitoringInterval = setTimeout(iterate, 1000);
      }
    };
 
    // Start the initial iteration
    iterate();
  }
 
  check_with(randomValue: number,purchase_value:number,index:number): void {
 
    console.log("Random value:", this.randomValue);
    // Calculate the difference percentage
    const difference = Math.abs(this.randomValue - purchase_value) / purchase_value * 100;
    // Check if the difference is greater than or less than 10% of avg_purchase_value
    if (difference > 10) {
      if (this.randomValue > purchase_value) {
        const curruntRecord3 = {
          Si: this.records[index].Si,
          avg_purchase_value: this.records[index].avg_purchase_value,
          Client_code: this.records[index].Client_code,
          Status: this.records[index].Status,
          Script: this.records[index].Script,
          Time: new Date().toLocaleString(),
          Type: 'High',
          percentage: difference,
          Current_value: this.randomValue
        };
        this.data1.push(curruntRecord3);
        this.cdr.markForCheck();
        const audio = new Audio('../assets/success.wav');
        this.toastr.success(" Stock - "+this.records[index].Script+ " Triggered a (" + difference.toFixed(2) + "%) Higher value from the Purchase value For the client - "+this.records[index].Client_code+ " ");
        audio.play();
        this.dataSource = new MatTableDataSource(this.data1);
        console.log(this.dataSource,"=======================================");
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      } else {
        const curruntRecord3 = {
          Si: this.records[index].Si,
          avg_purchase_value: this.records[index].avg_purchase_value,
          Client_code: this.records[index].Client_code,
          Status: this.records[index].Status,
          Script: this.records[index].Script,
          Time: new Date().toLocaleString(),
          Type: 'Low',
          percentage: difference,
          Current_value: this.randomValue
        };
        this.data1.push(curruntRecord3);
        this.cdr.markForCheck();
        const audio = new Audio('../assets/error.wav');
       
        this.toastr.error(" Stock - "+this.records[index].Script+ " Triggered a (" + difference.toFixed(2) + "%) lower value from the Purchase value For the client - "+this.records[index].Client_code+ " ");
        audio.play();
        this.dataSource = new MatTableDataSource(this.data1);
        console.log(this.dataSource,"=======================================");
        
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

  ExportTOExcel(){

    let csvData = this.displayedColumns.join(',') + '\n';
  
    // Add data rows
    csvData += this.dataSource.data.map(row => this.displayedColumns.map(column => row[column]).join(',')).join('\n');
  
    // Create CSV file
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Notifications.csv';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

ch_sample(script_name: string){
const token = this.stock_list.find(a => a.Symbol === script_name)
return token ? token.Token : null;
}




}

