import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryFormComponent } from './treasury-form.component';

describe('TreasuryFormComponent', () => {
  let component: TreasuryFormComponent;
  let fixture: ComponentFixture<TreasuryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasuryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreasuryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
