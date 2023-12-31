import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfExtractRoutingModule } from './pdf-extract-routing.module';
import { PdfExtractComponent } from './pdf-extract.component';


@NgModule({
  declarations: [
    PdfExtractComponent
  ],
  imports: [
    CommonModule,
    PdfExtractRoutingModule
  ]
})
export class PdfExtractModule { }
