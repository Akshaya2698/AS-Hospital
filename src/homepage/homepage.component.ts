import { Component, OnInit } from '@angular/core';
import { OverviewComponent } from '../overview/overview.component';
import { MeetourdoctorsComponent } from '../meetourdoctors/meetourdoctors.component';
import { OurfacilitiesComponent } from '../ourfacilities/ourfacilities.component';
import { PartneredPharmacyComponent } from '../partnered-pharmacy/partnered-pharmacy.component';
import { WhatseveryonesayingComponent } from '../whatseveryonesaying/whatseveryonesaying.component';
import { FaqsectionComponent } from '../faqsection/faqsection.component';
import { DataserviceService } from '../dataservice/dataservice.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [OverviewComponent,MeetourdoctorsComponent, OurfacilitiesComponent, PartneredPharmacyComponent, WhatseveryonesayingComponent, FaqsectionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  constructor(private dataservice: DataserviceService) { }

  ngOnInit(): void {
    this.dataservice.isHomepage = true;
  }
}
