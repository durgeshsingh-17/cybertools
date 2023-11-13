import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCrawlerComponent } from './image-crawler.component';

describe('ImageCrawlerComponent', () => {
  let component: ImageCrawlerComponent;
  let fixture: ComponentFixture<ImageCrawlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCrawlerComponent]
    });
    fixture = TestBed.createComponent(ImageCrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
