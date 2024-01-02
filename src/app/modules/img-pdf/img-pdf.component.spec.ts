import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPdfComponent } from './img-pdf.component';

describe('ImgPdfComponent', () => {
  let component: ImgPdfComponent;
  let fixture: ComponentFixture<ImgPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
