import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWrapper } from './project-wrapper';

describe('ProjectWrapper', () => {
  let component: ProjectWrapper;
  let fixture: ComponentFixture<ProjectWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
