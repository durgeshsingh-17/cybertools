import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgPdfComponent } from './img-pdf.component';

const routes: Routes = [
  {
    path:'',
    component:ImgPdfComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgPdfRoutingModule { }
