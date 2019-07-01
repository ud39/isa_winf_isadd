import { TestBed } from '@angular/core/testing';

import { EditDialogService } from './edit-dialog.service';

describe('EditDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditDialogService = TestBed.get(EditDialogService);
    expect(service).toBeTruthy();
  });
});
