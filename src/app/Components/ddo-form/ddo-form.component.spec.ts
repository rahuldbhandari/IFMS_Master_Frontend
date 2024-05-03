import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdoFormComponent } from './ddo-form.component';

describe('DdoFormComponent', () => {
  let component: DdoFormComponent;
  let fixture: ComponentFixture<DdoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DdoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
