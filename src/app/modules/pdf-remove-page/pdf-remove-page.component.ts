import { Component ,ViewChild} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-pdf-remove-page',
  templateUrl: './pdf-remove-page.component.html',
  styleUrls: ['./pdf-remove-page.component.scss']
})
export class PdfRemovePageComponent {
  pdfSrc: SafeResourceUrl | undefined;
  totalPages: number = 0;
 
  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      if (typeof (FileReader) !== 'undefined') {
        try{
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const pdfData = e.target.result;
            // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            //   'data:application/pdf;base64,' + btoa(pdfData)
            // );
            this.pdfSrc = pdfData;
            // console.log(this.pdfSrc);
          };
          reader.readAsArrayBuffer(file);

        }catch{
          console.error("rederring error")
        }
    }
    } else {
      // Handle invalid file type
      console.error('Invalid file type. Please select a PDF file.');
    }
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
    console.log(this.totalPages);
  }
}
