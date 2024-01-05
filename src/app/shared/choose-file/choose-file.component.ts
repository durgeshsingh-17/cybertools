import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
// import { PDFDocumentProxy } from 'ng2-pdf-viewer';
// import html2canvas from 'html2canvas';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.scss']
})
export class ChooseFileComponent implements OnInit, OnDestroy {

  // @Output() onSend: EventEmitter<{ pdfSrc: string, hidepage: boolean }> = new EventEmitter;
  // title = 'pdf-to-image';
  // pdfSrc = "";
  // totalPages: number = 0;
  // currentpage: number = 0;
  // isCropImage: boolean = false;
  // isPdfUploaded: boolean = false;

  // constructor(
  //   private http: HttpClient 
  // ) { }

  // ngOnInit() {
  //   this.currentpage = 1;
  //   console.log(this.ashu)
  // }

  // uploadFile(event: any) {
  //   let $img: any = document.querySelector('#upload-doc');
  //   if (event.target.files[0].type == 'application/pdf') {
  //     if (typeof (FileReader) !== 'undefined') {
  //       let reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.pdfSrc = e.target.result;
  //         this.isPdfUploaded=true;
  //         this.onSend.emit({pdfSrc:this.pdfSrc,hidepage:this.isPdfUploaded});
  //       };
  //       this.isPdfUploaded = true;
  //       reader.readAsArrayBuffer($img.files[0]);
  //     }
  //   } else {
  //     alert('please upload pdf file');
  //     console.log("ashu")
  //   }
  // }

  // // afterLoadComplete(pdf: PDFDocumentProxy) {
  // //   this.totalPages = pdf.numPages;
  // // }

  // downloadFile() {
  //   html2canvas(document.querySelector(".pdf-container") as HTMLElement).then((canvas: any) => {
  //     this.getCanvasToDownload(canvas)
  //   })
  // }

  // // download(url: any) {
  // //   this.http.get(url, {
  // //     responseType: 'blob',
  // //   }).subscribe((res: any) => {
  // //     saveAs(res, 'filename.zip');
  // //   });
  // // }

  // getCanvasToDownload(canvas: any) {
  //   let ctx = canvas.getContext('2d');
  //   ctx.scale(3, 3);
  //   let image = canvas.toDataURL("image/jpg").replace("image/jpg", "image/jpg");
  //   var link = document.createElement('a');
  //   link.download = "my-image.jpg";
  //   link.href = image;
  //   link.click();
  // }


  // previous() {
  //   if (this.currentpage > 0) {
  //     if (this.currentpage == 1) {
  //       this.currentpage = this.totalPages;
  //     } else {
  //       this.currentpage--;
  //     }
  //   }
  // }

  // next() {
  //   if (this.totalPages > this.currentpage) {
  //     this.currentpage++;
  //   } else {
  //     this.currentpage = 1;
  //   }
  // }






  config = {
    API: this.commonUtilities.getAPI('file_upload'),
    MIMETypesAccepted: "application/pdf",
    isMultipleSelectionAllowed: true,
    data: null
  };

  selectedFiles: {
    file: any,
    isUploadInProgress: boolean,
    uploadResult: any
  }[] = [];

  @ViewChild("fileSelector", { static: false }) file_selector!: ElementRef;

  file_selection_form: FormGroup;
  private file_selection_sub!: Subscription;
  private file_upload_sub!: Subscription;

  constructor(
    private commonUtilities: CommonService,
    private fb: FormBuilder
  ) {
    this.file_selection_form = this.fb.group({
      file_selection: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.trackFileSelection();
  }

  openFileSelector() {
    const file_selection = this.file_selector.nativeElement;
    file_selection.click();
  }

  trackFileSelection() {
    this.file_selection_sub = this.file_selection_form.get('file_selection')?.valueChanges.subscribe(
      () => {
        const file_selection = this.file_selector.nativeElement;
        this.selectFiles(file_selection.files);
        this.file_selector.nativeElement.value = '';
      }
    ) as Subscription;
  }

  selectFiles(incomingFiles: any) {
    let incomingFileCount = incomingFiles.length;
    let incorrectMIMEType = false;
    for (let i = 0; i < incomingFileCount; i++) {
      let incomingFileInfo = incomingFiles[i];
      if (!!!this.config.MIMETypesAccepted || this.config.MIMETypesAccepted.indexOf(incomingFileInfo.type) >= 0) {
        let selectedFile = {
          file: incomingFileInfo,
          isUploadInProgress: false,
          uploadResult: null
        };
        this.selectedFiles.push(selectedFile);
      } else {
        incorrectMIMEType = true;
      }
    }
    // Display error
    if (incorrectMIMEType) {
      let message = "Sorry, Only this extension/types of file are allowed: " + this.config.MIMETypesAccepted;
      this.commonUtilities.showSnackbar(message);
    }
  }

  uploadFile(index: number) {
    let fileForUpload = this.selectedFiles[index];
    const formData = new FormData();
    formData.append('file', fileForUpload.file);
    fileForUpload.isUploadInProgress = true;
    fileForUpload.uploadResult = null;
    this.file_upload_sub = this.commonUtilities.uploadFile(formData, this.config.API).subscribe({
      next: (success) => {
        setTimeout(() => {
          fileForUpload.uploadResult = success.message;
          fileForUpload.isUploadInProgress = false;
        }, 5000);
      }, error: (error) => {
        fileForUpload.uploadResult = error.message;
        fileForUpload.isUploadInProgress = false;
      }
    });
  }

  uploadAll() {
    let countSelectedFile = this.selectedFiles.length;
    for (let i = 0; i < countSelectedFile; i++) {
      let selected_file = this.selectedFiles[i];
      console.log('selected_file ###', selected_file)
      if (!selected_file.isUploadInProgress && selected_file.uploadResult != 'success') {
        this.uploadFile(i);
      }
    }
  }

  inititateFileCancel(index: number) {
    let fileForUpload = this.selectedFiles[index];
    if (fileForUpload.isUploadInProgress) {
      this.displayFileUploadAbortConfirmation(
        () => {
          this.cancelFile(index);
        }
      );
    } else {
      this.cancelFile(index);
    }
  }

  displayFileUploadAbortConfirmation(cancel_method: any) {
    this.commonUtilities.displayAlertDialog({
      data: {
        title: "Abort File Upload?",
        message: "Upload is already in progress. Aborting now might lead to data inconsistencies.",
        dismiss_text: 'Dismiss',
        action_text: 'Abort',
        action: () => {
          cancel_method();
        }
      }
    });
  }

  cancelFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  initiateCancelAll() {
    let countSelectedFile = this.selectedFiles.length;
    let is_any_file_being_uploaded = false;
    for (let i = 0; i < countSelectedFile; i++) {
      let selected_file = this.selectedFiles[i];
      // Checking if the file is being uploaded
      if (selected_file.isUploadInProgress) {
        is_any_file_being_uploaded = true;
        break;
      }
    }
    if (is_any_file_being_uploaded) {
      this.displayFileUploadAbortConfirmation(
        () => {
          this.cancelAll();
        }
      );
    } else {
      this.cancelAll();
    }
  }

  cancelAll() {
    let countSelectedFile = this.selectedFiles.length;
    for (let i = 0; i < countSelectedFile; i++) {
      this.selectedFiles.splice(0, 1);
    }
  }

  isAnyFileNotUploaded() {
    let countSelectedFile = this.selectedFiles.length;
    let is_any_file_not_uploaded = false;
    for (let i = 0; i < countSelectedFile; i++) {
      let selected_file = this.selectedFiles[i];
      // Checking if the file can be uploaded
      if (!selected_file.isUploadInProgress && selected_file.uploadResult != 'success') {
        is_any_file_not_uploaded = true;
        break;
      }
    }
    return is_any_file_not_uploaded;
  }

  ngOnDestroy(): void {
    this.commonUtilities.unsubscribeAll([
      this.file_selection_sub,
      this.file_upload_sub
    ]);
  }
}
