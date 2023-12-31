import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfRemovePageRoutingModule } from './pdf-remove-page-routing.module';
import { PdfRemovePageComponent } from './pdf-remove-page.component';


@NgModule({
  declarations: [
    PdfRemovePageComponent
  ],
  imports: [
    CommonModule,
    PdfRemovePageRoutingModule
  ]
})
export class PdfRemovePageModule { }
