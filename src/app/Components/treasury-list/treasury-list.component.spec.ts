import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryListComponent } from './treasury-list.component';

describe('TreasuryListComponent', () => {
  let component: TreasuryListComponent;
  let fixture: ComponentFixture<TreasuryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasuryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreasuryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
