import { ApiService } from './../service/api.service';
import { Component, OnInit, VERSION, ViewChild, ChangeDetectionStrategy, 
  ChangeDetectorRef, } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig, } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';

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
  Time:string;
}

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
 
})
export class DashComponent implements OnInit {

  

  name = 'Angular ' + VERSION.major;
  public records: Company[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay: any;
  modal = false;
  selected: any;

  purchase_value = 1000;

  public columns1: Columns[] = [
    { key: 'Si', title: 'Si' },
    { key: 'Pvalue', title: 'pvalue' },
    { key: 'Status', title: 'Status' },
    { key: 'Script', title: 'Script' },
    { key: 'C_id', title: 'C_id' },
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
  randomValue : number = 0;
  csvArr_try: Company[] = [];
  csvRecord: Company = null;
  constructor(private meta: Meta, public dialog: MatDialog, private ps: NgxPermissionsService,
    private snackBar: MatSnackBar, private rs: Router, public api: ApiService , private cdr:ChangeDetectorRef , private toastr: ToastrService) {
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

        this.api.g_q_shoonya(sample).subscribe((res: any) => {

          console.log(res);

          this.randomValue = res.lt;


        })





        console.log("Random value:", this.randomValue);

        // Calculate the difference percentage
        const difference = Math.abs(this.randomValue - Pvalue) / Pvalue * 100;

        // Check if the difference is greater than or less than 10% of Pvalue


       if (difference > 10) {
        if (this.randomValue > Pvalue) {

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
            this.toastr.success("The difference (" + difference.toFixed(2) + "%) exceeds 10% of Pvalue. The random value is higher.");
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
          this.toastr.error("The difference (" + difference.toFixed(2) + "%) exceeds 10% of Pvalue. The random value is lower.");
      }
      }
      index++;
      this.monitoringInterval =  setTimeout(iterate, 2000);
  } else {
      // Reset index to 0 and repeat the iteration
      console.log("Updated index " + index  );
      index = 0;
      this.monitoringInterval = setTimeout(iterate, 2000);
  }
};

// Start the initial iteration
iterate();
}





stopMonitoring() {
  clearTimeout(this.monitoringInterval);
}

startMing(){
  console.log(this.data1,"data1");
  
}


 showToast(message, type) {
  const toastContainer = document.getElementById('toastContainer');

  // Create a new toast element
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add('show');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  // Set toast type (success, danger, etc.)
  if (type === 'success') {
    toast.classList.add('bg-success');
  } else if (type === 'error') {
    toast.classList.add('bg-danger');
  } else {
    toast.classList.add('bg-info');
  }

  // Set toast content
  toast.innerHTML = `
    <div class="toast-header">
      <strong class="mr-auto">${type}</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;

  // Append toast to container
  toastContainer.appendChild(toast);

  // Hide the toast after 5 seconds
  setTimeout(() => {
    toast.remove();
  }, 5000);
}


}


//address?: { street: string; number?: number };





