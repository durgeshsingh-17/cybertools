import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PdfToImageComponent } from './modules/pdf-to-image/pdf-to-image.component';

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
          { path: 'pdf-to-image', component: PdfToImageComponent },
         
        
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
