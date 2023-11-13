import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageCrawlerComponent } from './image-crawler.component';

const routes: Routes = [
  {
    path:'',
    component:ImageCrawlerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageCrawlerRoutingModule { }
