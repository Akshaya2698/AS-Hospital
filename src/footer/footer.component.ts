import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice/dataservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

  constructor(public dataservice: DataserviceService) { }

  ngOnInit(): void {
    
  }
}
