import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfRemovePageRoutingModule } from './pdf-remove-page-routing.module';
import { PdfRemovePageComponent } from './pdf-remove-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PdfRemovePageComponent
  ],
  imports: [
    CommonModule,
    PdfRemovePageRoutingModule,
    SharedModule
  ]
})
export class PdfRemovePageModule { }
