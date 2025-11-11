import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartneredPharmacyComponent } from './partnered-pharmacy.component';

describe('PartneredPharmacyComponent', () => {
  let component: PartneredPharmacyComponent;
  let fixture: ComponentFixture<PartneredPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartneredPharmacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartneredPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
