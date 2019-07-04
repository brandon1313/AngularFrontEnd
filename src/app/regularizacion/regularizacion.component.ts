import { Component, OnInit } from '@angular/core';
import {RegularizacionService} from '../services/regularizacion.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar'

import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-regularizacion',
  templateUrl: './regularizacion.component.html',
  styleUrls: ['./regularizacion.component.css']
})
export class RegularizacionComponent implements OnInit {
  form: any = {};
  fileToUpload: File = null;
  fileName: string = null;
  customForm: FormGroup;
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  visible: boolean;
  isNullFileName:boolean;

  setTicket(ticekt: string){
   this.fileName = ticekt;
   console.log(this.fileName)
  } 

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(files.item(0));
}
  constructor(private regularizacionService: RegularizacionService) { }

  ngOnInit() {
  // this.createFormCustomize();
  this.visible = true;
  this.isNullFileName = false;
  }

 /* createFormCustomize (){
    this.customForm = this.formBuilder.group({
      'fileName':new FormControl({disabled: false,value: null}),
      'file':new FormControl({disabled: false,value: null}),

    });
  }*/



  onSubmit() {
    console.log(this.form);
    this.visible = false;
    console.log(this.visible)
    this.uploadFileToActivity()
    console.log(this.visible)
    
    
    
  }

  downloadFileSystem() {
    console.log(this.fileName)
    this.regularizacionService.downloadFileSystem(this.fileName)
      .subscribe(response => {
        const filename = response.headers.get('filename');
        console.log(filename)
 
        this.saveFile(response.body, this.fileName.concat(".txt"));
      });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }
  uploadFileToActivity() {
    if(this.fileName == null){
      console.log("file or name is null")
      this.isNullFileName = true;
      this.visible = true;
      return
    }else if(this.fileToUpload == null){
      this.visible = true;
      return
    }
    this.regularizacionService.postFileUp(this.fileToUpload,this.fileName).subscribe(data => {
      // do something, if upload success
      
      this.downloadFileSystem();
      window.location.reload();
      }, error => {
        console.log(error);
      });

  }
}
