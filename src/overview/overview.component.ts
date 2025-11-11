import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {

  src: any;
  isHoverbox1: Boolean = false;
  isHoverbox2: Boolean = false;
  isHoverbox3: Boolean = false;

  ngOnInit(): void {
    
  }

  hover(wellbeing: any, inOrOut: boolean = false, boxNumber: any) {
    if(boxNumber == 1) {
      if(inOrOut) {
        this.src = '/images/'+ wellbeing + '.jpg';
        this.isHoverbox1 = true;
      }
      else {
        this.isHoverbox1 = false;
      }
    }
    if(boxNumber == 2) {
      if(inOrOut) {
        this.src = '/images/'+ wellbeing + '.png';
        this.isHoverbox2 = true;
      }
      else {
        this.isHoverbox2 = false;
      }
    }
    if(boxNumber == 3) {
      if(inOrOut) {
        this.src = '/images/'+ wellbeing + '.jpg';
        this.isHoverbox3 = true;
      }
      else {
        this.isHoverbox3 = false;
      }
    }
  }

  hoverout() {
    this.isHoverbox1 = false;
    this.isHoverbox2 = false;
    this.isHoverbox3 = false;
  }
}
