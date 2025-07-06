import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortalityRegistration } from './mortality-registration';

describe('MortalityRegistration', () => {
  let component: MortalityRegistration;
  let fixture: ComponentFixture<MortalityRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortalityRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortalityRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
