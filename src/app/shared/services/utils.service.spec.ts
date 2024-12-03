import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let utilsService: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService],
    });
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(utilsService).toBeTruthy();
  });
});
