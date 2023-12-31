import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfRotateComponent } from './pdf-rotate.component';

const routes: Routes = [
  {
    path:'',
    component:PdfRotateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfRotateRoutingModule { }
