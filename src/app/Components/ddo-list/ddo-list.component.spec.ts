import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdoListComponent } from './ddo-list.component';

describe('DdoListComponent', () => {
  let component: DdoListComponent;
  let fixture: ComponentFixture<DdoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DdoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
