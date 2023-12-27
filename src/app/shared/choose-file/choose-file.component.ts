import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.scss']
})
export class ChooseFileComponent implements OnInit {
  @Input() ashu!:string
  @Output() onSend : EventEmitter<{pdfSrc:string,hidepage:boolean}> = new EventEmitter;
  title = 'pdf-to-image';
  pdfSrc = "";
  totalPages: number = 0;
  currentpage: number = 0;
  isCropImage: boolean = false;
  isPdfUploaded: boolean = false;

  constructor(
    private http: HttpClient 
  ) { }

  ngOnInit() {
    this.currentpage = 1;
    console.log(this.ashu)
  }

  uploadFile(event: any) {
    let $img: any = document.querySelector('#upload-doc');
    if (event.target.files[0].type == 'application/pdf') {
      if (typeof (FileReader) !== 'undefined') {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfSrc = e.target.result;
          this.isPdfUploaded=true;
          this.onSend.emit({pdfSrc:this.pdfSrc,hidepage:this.isPdfUploaded});
        };
        this.isPdfUploaded = true;
        reader.readAsArrayBuffer($img.files[0]);
      }
    } else {
      alert('please upload pdf file');
      console.log("ashu")
    }
  }
 
  // afterLoadComplete(pdf: PDFDocumentProxy) {
  //   this.totalPages = pdf.numPages;
  // }

  downloadFile() {
    html2canvas(document.querySelector(".pdf-container") as HTMLElement).then((canvas: any) => {
      this.getCanvasToDownload(canvas)
    })
  }

  // download(url: any) {
  //   this.http.get(url, {
  //     responseType: 'blob',
  //   }).subscribe((res: any) => {
  //     saveAs(res, 'filename.zip');
  //   });
  // }

  getCanvasToDownload(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.scale(3, 3);
    let image = canvas.toDataURL("image/jpg").replace("image/jpg", "image/jpg");
    var link = document.createElement('a');
    link.download = "my-image.jpg";
    link.href = image;
    link.click();
  }


  previous() {
    if (this.currentpage > 0) {
      if (this.currentpage == 1) {
        this.currentpage = this.totalPages;
      } else {
        this.currentpage--;
      }
    }
  }

  next() {
    if (this.totalPages > this.currentpage) {
      this.currentpage++;
    } else {
      this.currentpage = 1;
    }
  }
}
