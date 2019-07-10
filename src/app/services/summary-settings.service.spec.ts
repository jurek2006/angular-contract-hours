import { TestBed } from '@angular/core/testing';

import { SummarySettingsService } from './summary-settings.service';

describe('SummarySettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummarySettingsService = TestBed.get(SummarySettingsService);
    expect(service).toBeTruthy();
  });
});
