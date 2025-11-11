import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Pharmacy from '../../public/json/pharmacy.json';

@Component({
  selector: 'app-partnered-pharmacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partnered-pharmacy.component.html',
  styleUrl: './partnered-pharmacy.component.css'
})
export class PartneredPharmacyComponent {

  pharmacyList = Pharmacy;
  currentIndex = 0;
  isDisableLeft: Boolean = true;
  isDisableRight: Boolean = false;
  totalSlides: number = 0;
  visibleSlides: number = 3;

  ngOnInit(): void {
    console.log("Pharmacies - ", this.pharmacyList);
    this.totalSlides = this.pharmacyList.length - this.visibleSlides;
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

  get transform() {
    var transformOffset = this.currentIndex * 75;   
    return `translateX(-${transformOffset}vw)`;
  }
}
