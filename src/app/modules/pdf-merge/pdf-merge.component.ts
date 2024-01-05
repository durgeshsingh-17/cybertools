import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PDFDocument, degrees } from 'pdf-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-pdf-merge',
  templateUrl: './pdf-merge.component.html',
  styleUrls: ['./pdf-merge.component.scss']
})
export class PdfMergeComponent implements OnInit{
  pdfMerge !:FormGroup;
  selectedFile!: File  ;
  selectedFile1!: File ;
  pdfSrc:any;
  pdfPages:any;
   link!:string;
   downloadLink:boolean = false;
   mergedPdfData:any;
   rotationArray: { rotate: number; degree: number }[] = [];
   constructor(private fb:FormBuilder,private http: HttpClient){
 
   }
  ngOnInit(): void {
    this.pdfMerge = this.fb.group({
      pdf:[""],
    })
  }

  async onFileSelected(event: any): Promise<void> {
    const file1 = event.target.files[0] as File;
    const file2 = event.target.files[1] as File;
    this.selectedFile = file1;
    this.selectedFile1 = file2;
  }
  
  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (event) => {
        reject(event);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  async mergePdfs(pdfData1: Uint8Array, pdfData2: Uint8Array): Promise<Uint8Array> {
    try {

      const pdfDoc1 = await PDFDocument.load(pdfData1);
      const pdfDoc2 = await PDFDocument.load(pdfData2);
      const mergedPdf = await PDFDocument.create();
      const pages1 = await mergedPdf.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
      const pages2 = await mergedPdf.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
  
      for (const page of pages1) {
        console.log("Ashu")
        mergedPdf.addPage(page);
      }
      
      for (const page of pages2) {
        console.log("kumar")
      

        mergedPdf.addPage(page);
      }
      if (this.rotationArray.length > 0) {
        let pageIndicesToModify = this.rotationArray.map(item => item.rotate);
       
        let pagesToModify = await mergedPdf.copyPages(mergedPdf, pageIndicesToModify);
          console.log(pagesToModify);
        for (let i = 0; i < pagesToModify.length; i++) {
          const cpage = pagesToModify[i];
          const rotationInfo = this.rotationArray.find(item => item.rotate === pageIndicesToModify[i]);
      
          if (rotationInfo) {
            cpage.setRotation(degrees(rotationInfo.degree));
            const pageIndex = pageIndicesToModify[i];
            mergedPdf.removePage(pageIndex);
            mergedPdf.insertPage(pageIndex, pagesToModify[i]);
          }
        }
      }

      this.pdfPages = mergedPdf.getPageIndices();

      console.log( mergedPdf.getPageIndices());
      const mergedPdfBytes = await mergedPdf.save();
      return mergedPdfBytes;
    } catch (error) {
      console.error('Error merging PDFs:', error);
      throw error;
    }
  }
  async onUpload(): Promise<void> {
    if (this.selectedFile && this.selectedFile1) {
      const pdfData1 = await this.selectedFile.arrayBuffer();
      const pdfData2 = await this.selectedFile1.arrayBuffer();
      try {
         this.mergedPdfData = await this.mergePdfs(new Uint8Array(pdfData1), new Uint8Array(pdfData2));
         const blob = new Blob([this.mergedPdfData], { type: 'application/pdf' });
         const dataUrl = URL.createObjectURL(blob);
         this.pdfSrc = dataUrl;
         this.downloadLink = true;
        } catch (error) {
          console.error('Error merging PDFs:', error);
        }
    } else {
      console.warn('Please select two PDF files.');
    }
  }
  downLoad(){
    
    console.log(this.rotationArray);
    const blob = new Blob([this.mergedPdfData], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'merged.pdf';
    this.link = link.href;
    link.click();
  }
  afterLoadComplete(pdf: PDFDocumentProxy) {
    // this.totalPages = pdf.numPages;
    // console.log(this.totalPages);
  }

  rotatePage(index:number){
    let existingRotationIndex = this.rotationArray.findIndex(item => item.rotate === index);
    
    if (existingRotationIndex !== -1) {
      // If rotation for this index already exists, modify the existing entry
      this.rotationArray[existingRotationIndex].degree = (this.rotationArray[existingRotationIndex].degree + 90) % 360;
    } else {
      // If rotation for this index does not exist, add a new entry
      this.addRotationInfo(index, 90);
    }
    this.onUpload();
  }
  addRotationInfo(rotate: number, degree: number): void {
    this.rotationArray.push({ rotate,degree });
  }
}
