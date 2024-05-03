import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdetailFormComponent } from './subdetail-form.component';

describe('SubdetailFormComponent', () => {
  let component: SubdetailFormComponent;
  let fixture: ComponentFixture<SubdetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdetailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubdetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
