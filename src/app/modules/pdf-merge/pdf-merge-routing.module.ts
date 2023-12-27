import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfMergeComponent } from './pdf-merge.component';

const routes: Routes = [
  {
    path:'',
    component:PdfMergeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfMergeRoutingModule { }
