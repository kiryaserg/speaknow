import { TestBed } from '@angular/core/testing';

import { EmailsFormService } from './emails-form.service';

describe('EmailsFormService', () => {
  let service: EmailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
