import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import FAQs from '../../public/json/faq.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqsection',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './faqsection.component.html',
  styleUrl: './faqsection.component.css'
})
export class FaqsectionComponent implements OnInit {
  faqContent: any = FAQs;

  ngOnInit(): void {
    console.log("FAQ - ", this.faqContent);
  }
}
