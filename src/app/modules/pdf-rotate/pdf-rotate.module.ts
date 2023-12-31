import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfRotateRoutingModule } from './pdf-rotate-routing.module';
import { PdfRotateComponent } from './pdf-rotate.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PdfRotateComponent
  ],
  imports: [
    CommonModule,
    PdfRotateRoutingModule,
    SharedModule
  ]
})
export class PdfRotateModule { }
