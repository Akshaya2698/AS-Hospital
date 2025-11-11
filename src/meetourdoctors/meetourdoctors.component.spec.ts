import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetourdoctorsComponent } from './meetourdoctors.component';

describe('MeetourdoctorsComponent', () => {
  let component: MeetourdoctorsComponent;
  let fixture: ComponentFixture<MeetourdoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetourdoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetourdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
