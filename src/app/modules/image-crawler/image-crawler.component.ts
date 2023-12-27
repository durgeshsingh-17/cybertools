import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { config } from 'src/app/services/config';


@Component({
  selector: 'app-image-crawler',
  templateUrl: './image-crawler.component.html',
  styleUrls: ['./image-crawler.component.scss']
})
export class ImageCrawlerComponent implements  OnInit {
 
  webLink: any;
  constructor() {}

  ngOnInit(): void {

  }

  fetchImages() {
    console.log(this.webLink);
  }

  

}
