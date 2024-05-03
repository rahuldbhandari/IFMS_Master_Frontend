import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdetailheadListComponent } from './SubdetailheadListComponent';

describe('SubdetailheadListComponent', () => {
  let component: SubdetailheadListComponent;
  let fixture: ComponentFixture<SubdetailheadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdetailheadListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubdetailheadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
