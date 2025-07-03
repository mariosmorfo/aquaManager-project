import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStocking } from './fish-stocking';

describe('FishStocking', () => {
  let component: FishStocking;
  let fixture: ComponentFixture<FishStocking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FishStocking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishStocking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
