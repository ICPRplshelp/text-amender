import { TestBed } from '@angular/core/testing';

import { Conv1Service } from './conv1.service';

describe('Conv1Service', () => {
  let service: Conv1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conv1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
