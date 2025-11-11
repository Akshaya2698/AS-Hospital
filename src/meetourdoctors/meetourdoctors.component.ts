import { Component, OnInit } from '@angular/core';
import Doctors from '../../public/json/doctors.json'
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-meetourdoctors',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './meetourdoctors.component.html',
  styleUrl: './meetourdoctors.component.css'
})
export class MeetourdoctorsComponent implements OnInit{

  doctorsList = Doctors;
  exploring: Boolean = false;
  
  ngOnInit(): void {
    console.log("Doctors List - ", this.doctorsList);
  }

  explore() {
    this.exploring = true;
  }
}
