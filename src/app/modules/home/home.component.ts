import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  homeData:any[]=[
    {image:'https://ezytool.com/assets/img/merge.svg',title:'Image Crawling',body:'Image Fetch from any live website',routerlink:'/image-crawler'},
    {image:'https://ezytool.com/assets/img/pdftoimg.svg',title:'Merge Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-merge'},
    {image:'https://ezytool.com/assets/img/ocr.svg',title:'Split Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.'},
    {image:'https://ezytool.com/assets/img/merge.svg',title:'Add Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.'},
    {image:'https://ezytool.com/assets/img/emi-calculate.png',title:'Merge Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.'},
    {image:'https://ezytool.com/assets/img/merge.svg',title:'Block Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.'},
    {image:'https://ezytool.com/assets/img/ocr.svg',title:'Merge Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.'},
    {image:'https://ezytool.com/assets/img/pdftoimg.svg',title:'Solid Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.'},

  ];
  
  searchTerm: string = '';
  
    get filteredData(): any[] {
      return this.homeData.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

}