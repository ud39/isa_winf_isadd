import { TestBed } from '@angular/core/testing';

import { InputFormService } from './input-form.service';

describe('InputFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputFormService = TestBed.get(InputFormService);
    expect(service).toBeTruthy();
  });
});
