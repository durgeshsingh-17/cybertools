import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-rotate',
  templateUrl: './pdf-rotate.component.html',
  styleUrls: ['./pdf-rotate.component.scss']
})
export class PdfRotateComponent {
  rotatedPdfLink: string | null = null;

  constructor() {}
  // async rotatePdf(inputPdfBuffer: ArrayBuffer, outputRotation: number): Promise<ArrayBuffer> {
  //   // const pdfDoc = await pdfjs.getDocument({ data: inputPdfBuffer }).promise;
  //   const numPages = pdfDoc.numPages;

  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d') as CanvasRenderingContext2D; // Type assertion here

  //   const promises = [];

  //   for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
  //     // const page = await pdfDoc.getPage(pageNumber);
  //     const viewport = page.getViewport({ scale: 1 });

  //     canvas.width = viewport.width;
  //     canvas.height = viewport.height;

  //     await page.render({ canvasContext: context, viewport }).promise;

  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     canvas.width = viewport.height;
  //     canvas.height = viewport.width;

  //     if (outputRotation !== 0) {
  //       context.translate(canvas.width / 2, canvas.height / 2);
  //       context.rotate((outputRotation * Math.PI) / 180);
  //       context.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
  //       context.setTransform(1, 0, 0, 1, 0, 0);
  //     } else {
  //       context.drawImage(canvas, 0, 0);
  //     }

  //     const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  //     promises.push(Promise.resolve(imageData.data.buffer));
  //   }

  //   const rotatedPdfBuffer = await Promise.all(promises);

  //   // Combine rotated images into a single PDF
  //   const mergedPdfDoc = await pdfjs.getDocument({ data: rotatedPdfBuffer[0] }).promise;
  //   const mergedPdfBuffer = await mergedPdfDoc.getData();

  //   return mergedPdfBuffer;
  // }
  // async rotatePdfSubmit(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const inputFile = inputElement.files[0];

  //     try {
  //       // console.log(Ashu);
  //       const inputPdfBuffer = await this.readFileAsArrayBuffer(inputFile);

       
  //       const rotatedPdfBuffer = await this.rotatePdf(inputPdfBuffer, 90);

  //       // Save or use the rotated PDF buffer as needed
  //       this.saveRotatedPdf(rotatedPdfBuffer);
  //     } catch (error) {
  //       console.error('Error processing PDF:', error);
  //     }
  //   }
  // }

  // private async readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  //   return new Promise<ArrayBuffer>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result as ArrayBuffer);
  //     reader.onerror = reject;
  //     reader.readAsArrayBuffer(file);
  //   });
  // }

  // private saveRotatedPdf(pdfBuffer: ArrayBuffer) {
  //   const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
  //   const url = URL.createObjectURL(blob);
  //   console.log(url);
  //   this.rotatedPdfLink = url;
  // }
}
function rotate(radians: number): import("pdf-lib").Rotation {
  throw new Error('Function not implemented.');
}

