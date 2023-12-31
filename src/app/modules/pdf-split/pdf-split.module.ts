import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfSplitRoutingModule } from './pdf-split-routing.module';
import { PdfSplitComponent } from './pdf-split.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PdfSplitComponent
  ],
  imports: [
    CommonModule,
    PdfSplitRoutingModule,
    SharedModule
  ]
})
export class PdfSplitModule { }
