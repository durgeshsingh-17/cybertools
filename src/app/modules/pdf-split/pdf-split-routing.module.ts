import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfSplitComponent } from './pdf-split.component';

const routes: Routes = [
  {
    path:'',
    component:PdfSplitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfSplitRoutingModule { }
