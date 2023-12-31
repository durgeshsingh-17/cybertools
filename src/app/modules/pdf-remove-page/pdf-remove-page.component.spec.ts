import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfRemovePageComponent } from './pdf-remove-page.component';

describe('PdfRemovePageComponent', () => {
  let component: PdfRemovePageComponent;
  let fixture: ComponentFixture<PdfRemovePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfRemovePageComponent]
    });
    fixture = TestBed.createComponent(PdfRemovePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
