import { TestBed } from '@angular/core/testing';

import { MomentMonthsService } from './moment-months.service';

describe('MomentMonthsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MomentMonthsService = TestBed.get(MomentMonthsService);
    expect(service).toBeTruthy();
  });
});
