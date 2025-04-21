import { TestBed } from '@angular/core/testing';

import { SurveyContentService } from './survey-content.service';

describe('SurveyContentService', () => {
  let service: SurveyContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
