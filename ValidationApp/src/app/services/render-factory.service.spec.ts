import { TestBed } from '@angular/core/testing';

import { RenderFactoryService } from './render-factory.service';

describe('RenderFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderFactoryService = TestBed.get(RenderFactoryService);
    expect(service).toBeTruthy();
  });
});
