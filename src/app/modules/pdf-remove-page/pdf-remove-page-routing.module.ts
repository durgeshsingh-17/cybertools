import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfRemovePageComponent } from './pdf-remove-page.component';

const routes: Routes = [
  {
    path:'',
    component:PdfRemovePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfRemovePageRoutingModule { }
