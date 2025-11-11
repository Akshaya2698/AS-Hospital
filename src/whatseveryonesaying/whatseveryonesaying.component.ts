import { Component, OnInit } from '@angular/core';
import feedback from '../../public/json/whatseveryonesaying.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatseveryonesaying',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatseveryonesaying.component.html',
  styleUrl: './whatseveryonesaying.component.css'
})
export class WhatseveryonesayingComponent implements OnInit {

  slides = feedback;
  currentIndex = 0;
  isDisableLeft: Boolean = true;
  isDisableRight: Boolean = false;
  totalSlides: number = 0;
  visibleSlides: number = 1;

  ngOnInit(): void {
    console.log("slides - ", this.slides);
    this.totalSlides = this.slides.length;
  }

  get feedback() {
    var slide = this.slides.filter((slide, i) => slide.content && i==this.currentIndex);
    return slide;
  }

  previous() {
    this.isDisableRight = false;
    this.currentIndex -= 1;
    if(this.currentIndex == 0) {
      this.isDisableLeft = true;
    }
  }

  next() {
    this.isDisableLeft = false;
    this.currentIndex += 1;
    if(this.currentIndex == this.totalSlides-this.visibleSlides) {
      this.isDisableRight = true;
    }
  }
}
