import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChooseFileComponent } from './choose-file/choose-file.component';
import { ViewImagesComponent } from './view-images/view-images.component';



@NgModule({
  declarations: [
    ChooseFileComponent,
    ViewImagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ChooseFileComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class SharedModule { }
