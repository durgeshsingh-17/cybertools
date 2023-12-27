import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pdf-merge',
  templateUrl: './pdf-merge.component.html',
  styleUrls: ['./pdf-merge.component.scss']
})
export class PdfMergeComponent implements OnInit{
  pdfMerge !:FormGroup;
  ngOnInit(): void {
    this.pdfMerge = this.fb.group({
      pdf:[""],
    })
  }
  constructor(private fb:FormBuilder){

  }
  onSubmit(){
   console.log(this.pdfMerge.value);

  }
}
