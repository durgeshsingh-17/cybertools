import { Component } from '@angular/core';
import { PDFDocument, PDFPage } from 'pdf-lib';
@Component({
  selector: 'app-pdf-split',
  templateUrl: './pdf-split.component.html',
  styleUrls: ['./pdf-split.component.scss']
})
export class PdfSplitComponent {
  selectedFile: File | null = null;
  pageRange: string = '';
  splitPages: PDFPage[] = [];

  seprate:boolean = false;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async splitPDF(): Promise<void> {
    if (!this.selectedFile) {
      console.error('Please choose a PDF file.');
      return;
    }

    const fileBuffer = await this.readFile(this.selectedFile);
    const pdfBytes = new Uint8Array(fileBuffer);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    if (this.pageRange.trim() === '') {
      console.error('Please provide a valid page range.');
      return;
    }

    const [startPage, endPage] = this.pageRange.split(',').map(Number);

    if (isNaN(startPage) || isNaN(endPage) || startPage < 1 || endPage > pdfDoc.getPageCount() || startPage > endPage) {
      console.error('Invalid page range.');
      return;
    }
    if(this.seprate){
      for (let page = startPage; page <= endPage; page++) {
        const newPdfDoc = await PDFDocument.create();
        const copiedPage = await newPdfDoc.copyPages(pdfDoc, [page - 1]);
        newPdfDoc.addPage(copiedPage[0]);

        const newPdfBytes = await newPdfDoc.save();
        this.downloadFile(newPdfBytes, `page_${page}.pdf`);
      }
    }else{
      const newPdfDoc = await PDFDocument.create();
      const pagesToCopy = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesToCopy);
      copiedPages.forEach((page) => newPdfDoc.addPage(page));
  
      const newPdfBytes = await newPdfDoc.save();
      this.downloadFile(newPdfBytes, `pages_${startPage}_${endPage}.pdf`);

    }

  }

  private async readFile(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as ArrayBuffer);
      reader.onerror = (event) => reject(event.target?.error);
      reader.readAsArrayBuffer(file);
    });
  }

  private downloadFile(data: Uint8Array, filename: string): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
