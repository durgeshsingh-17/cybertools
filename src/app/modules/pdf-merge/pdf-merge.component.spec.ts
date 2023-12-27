import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfMergeComponent } from './pdf-merge.component';

describe('PdfMergeComponent', () => {
  let component: PdfMergeComponent;
  let fixture: ComponentFixture<PdfMergeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfMergeComponent]
    });
    fixture = TestBed.createComponent(PdfMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
