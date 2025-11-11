import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsectionComponent } from './faqsection.component';

describe('FaqsectionComponent', () => {
  let component: FaqsectionComponent;
  let fixture: ComponentFixture<FaqsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
