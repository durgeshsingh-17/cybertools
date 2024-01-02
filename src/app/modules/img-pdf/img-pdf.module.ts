import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgPdfRoutingModule } from './img-pdf-routing.module';
import { ImgPdfComponent } from './img-pdf.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ImgPdfComponent
  ],
  imports: [
    CommonModule,
    ImgPdfRoutingModule,
    SharedModule
  ]
})
export class ImgPdfModule { }
