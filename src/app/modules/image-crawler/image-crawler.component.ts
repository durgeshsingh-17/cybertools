import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-crawler',
  templateUrl: './image-crawler.component.html',
  styleUrls: ['./image-crawler.component.scss']
})
export class ImageCrawlerComponent implements  OnInit {
  imageUrls: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Replace 'your_public_url' with the actual public URL containing images
    const publicUrl = 'https://88cric.com';
    this.fetchImages(publicUrl);
  }

  fetchImages(url: string): void {
    this.http.get(url,{responseType:'text'}).subscribe(
      (html: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imgElements = doc.querySelectorAll('img');
        console.log(html);
        imgElements.forEach((img: HTMLImageElement) => {
          this.imageUrls.push(img.src);
        });
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  downloadImage(imageUrl: string): void {
    // You can implement image download logic here
    // For example, open the image in a new window for download
    window.open(imageUrl, '_blank');
  }

}
