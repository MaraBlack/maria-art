import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingLetters } from './rolling-letters';

describe('RollingLetters', () => {
  let component: RollingLetters;
  let fixture: ComponentFixture<RollingLetters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollingLetters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollingLetters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
