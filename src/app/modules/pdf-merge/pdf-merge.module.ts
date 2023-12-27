import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfMergeRoutingModule } from './pdf-merge-routing.module';
import { PdfMergeComponent } from './pdf-merge.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PdfMergeComponent
  ],
  imports: [
    CommonModule,
    PdfMergeRoutingModule,
    SharedModule
  ]
})
export class PdfMergeModule { }
