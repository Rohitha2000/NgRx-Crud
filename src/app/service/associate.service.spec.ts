import { TestBed } from '@angular/core/testing';

import { AssociateService } from './associate.service';
import { provideHttpClient } from '@angular/common/http';

describe('AssociateService', () => {
  let service: AssociateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient()]
    });
    service = TestBed.inject(AssociateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
