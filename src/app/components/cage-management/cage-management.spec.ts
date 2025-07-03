import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CageManagement } from './cage-management';

describe('CageManagement', () => {
  let component: CageManagement;
  let fixture: ComponentFixture<CageManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CageManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CageManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
