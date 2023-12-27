import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
{
  path:'',
  component:MainComponent,
  children:[
          {
            path:'',
            loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)
          },
          {
            path:'index',
            redirectTo:'',
            pathMatch:'full',
            loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)
          },
          {
            path:'image-crawler',
            loadChildren:()=>import('./modules/image-crawler/image-crawler.module').then( m=> m.ImageCrawlerModule)
          },
          {
            path:'pdf-merge',
            loadChildren:()=>import('./modules/pdf-merge/pdf-merge.module').then(m=>m.PdfMergeModule),
          }
         
        
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
