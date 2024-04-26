import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorheadsListComponent } from './majorheads-list.component';

describe('MajorheadsListComponent', () => {
  let component: MajorheadsListComponent;
  let fixture: ComponentFixture<MajorheadsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorheadsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MajorheadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
