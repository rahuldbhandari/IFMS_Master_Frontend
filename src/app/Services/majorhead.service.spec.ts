import { TestBed } from '@angular/core/testing';
import { MajorheadService } from './majorhead.service';



describe('MajorheadServiceService', () => {
  let service: MajorheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MajorheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
