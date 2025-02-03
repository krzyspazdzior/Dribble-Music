import { TestBed } from '@angular/core/testing';

import { ArtistsService } from './artist.service';

describe('StatisticsService', () => {
  let service: ArtistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
