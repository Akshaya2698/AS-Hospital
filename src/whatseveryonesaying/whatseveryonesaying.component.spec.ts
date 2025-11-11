import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatseveryonesayingComponent } from './whatseveryonesaying.component';

describe('WhatseveryonesayingComponent', () => {
  let component: WhatseveryonesayingComponent;
  let fixture: ComponentFixture<WhatseveryonesayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatseveryonesayingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatseveryonesayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
