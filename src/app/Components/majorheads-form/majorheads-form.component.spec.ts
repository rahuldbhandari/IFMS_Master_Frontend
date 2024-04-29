import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorheadsFormComponent } from './majorheads-form.component';

describe('MajorheadsFormComponent', () => {
  let component: MajorheadsFormComponent;
  let fixture: ComponentFixture<MajorheadsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorheadsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MajorheadsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
