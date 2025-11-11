import { Component, OnInit } from '@angular/core';
import Facilities from '../../public/json/facilities.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ourfacilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ourfacilities.component.html',
  styleUrl: './ourfacilities.component.css'
})
export class OurfacilitiesComponent implements OnInit {

  facilityList = Facilities;
  currentIndex = 0;
  isDisableLeft: Boolean = true;
  isDisableRight: Boolean = false;
  totalSlides: number = 0;
  visibleSlides: number = 4;

  ngOnInit(): void {
    console.log("Facilities - ", this.facilityList);
    this.totalSlides = this.facilityList.length;
  }

  get listOfFacilities() {
    const start = this.currentIndex;
    const end = start + this.visibleSlides;
    return Facilities.slice(start, end);
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
