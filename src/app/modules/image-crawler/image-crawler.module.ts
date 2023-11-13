import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCrawlerRoutingModule } from './image-crawler-routing.module';
import { ImageCrawlerComponent } from './image-crawler.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ImageCrawlerComponent
  ],
  imports: [
    CommonModule,
    ImageCrawlerRoutingModule,
    SharedModule
  ]
})
export class ImageCrawlerModule { }
