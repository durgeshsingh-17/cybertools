import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PDFDocument, degrees } from 'pdf-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-pdf-remove-page',
  templateUrl: './pdf-remove-page.component.html',
  styleUrls: ['./pdf-remove-page.component.scss']
})
export class PdfRemovePageComponent {
  pdfMerge !:FormGroup;
  selectedFile!: File  ;
  selectedFile1!: File ;
  mergedPdf!:PDFDocument;
  pdfSrc:any;
  pdfPages:any;
   link!:string;
   downloadLink:boolean = false;
   mergedPdfData:any;
   removeArray: any[] = [];
   constructor(private fb:FormBuilder,private http: HttpClient){
 
   }
  ngOnInit(): void {
    this.pdfMerge = this.fb.group({
      pdf:[""],
    })
  }

  async onFileSelected(event: any): Promise<void> {
    const files = event.map((e: any) => e.file as File);
  
    if (files.length === 0) {
      return;
    }
    if (files.length > 1) {
      console.warn("Please select 1 file");
      return;
    }
  
    const pdfDataArray: Uint8Array[] = [];
  
    for (const file of files) {
      const pdfData = await this.readFileAsArrayBuffer(file);
      pdfDataArray.push(new Uint8Array(pdfData));
    }
  
    try {
      this.mergedPdfData = await this.removePdfs(...pdfDataArray);
      const blob = new Blob([this.mergedPdfData], { type: 'application/pdf' });
      const dataUrl = URL.createObjectURL(blob);
      this.pdfSrc = dataUrl;
     
    } catch (error) {
      console.error('Error merging PDFs:', error);
    }
  }
  
  
  async readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const arrayBuffer = (event.target.result as ArrayBuffer);
          resolve(arrayBuffer);
        } else {
          reject(new Error('Error reading file as ArrayBuffer.'));
        }
      };

      const blob = new Blob([file]);
      reader.readAsArrayBuffer(blob);
    });
  }
  
  async removePdfs(...pdfDataArray: Uint8Array[]): Promise<Uint8Array> {
    try {
         this.mergedPdf = await PDFDocument.create();
        for (const pdfData of pdfDataArray) {
          let pdfDoc = await PDFDocument.load(pdfData);
          let pages = await this.mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    
          for (let page of pages) {
            this.mergedPdf.addPage(page);
          }
        }
      this.pdfPages = this.mergedPdf.getPageIndices();
      const mergedPdfBytes = await this.mergedPdf.save();
      return mergedPdfBytes;
    } catch (error) {
      console.error('Error merging PDFs:', error);
      throw error;
    }
  }
 
  async removePages(){
    if(this.removeArray.length >0){
      for(let i = 0; i<this.removeArray.length;i++){
        console.log(this.removeArray[i])
          this.mergedPdf.removePage(this.removeArray[i]);
      }
    }
    let mergedPdfBytes = await this.mergedPdf.save();
    this.downloadLink = true;
    
    this.mergedPdfData = mergedPdfBytes;
    return  mergedPdfBytes;
  }
 async downLoad(){this
    let blob = new Blob([this.mergedPdfData], { type: 'application/pdf' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'remove_pages.pdf';
    this.link = link.href;
    link.click();
  }
  


  removePage(index:number){
   if(!this.removeArray.includes(index)){
     this.removeArray.push(index); 
   } else{
    let indexToRemove = this.removeArray.indexOf(index);
    this.removeArray.splice(indexToRemove, 1);
   }
  }
  afterLoadComplete(pdf: PDFDocumentProxy) {
  }
}
