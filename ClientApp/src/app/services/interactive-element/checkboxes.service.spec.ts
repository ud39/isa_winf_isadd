import { TestBed } from '@angular/core/testing';

import { CheckboxesService } from './checkboxes.service';

describe('CheckboxesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckboxesService = TestBed.get(CheckboxesService);
    expect(service).toBeTruthy();
  });
});
