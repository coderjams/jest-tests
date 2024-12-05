import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TagInterface } from '../types/tag.interface';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(), // Provide the HttpClient along with HttpClientTesting
        provideHttpClientTesting(),
      ],
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no outstanding requests
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('getTags', () => {
    it('should return a list of tags', () => {
      let tags: TagInterface[] | undefined;
      apiService.getTags().subscribe((response) => {
        tags = response;
      });
      const req = httpTestingController.expectOne(
        'http://localhost:3004.com/tags'
      );
      req.flush([{ id: '1', name: 'foo' }]);
      expect(tags).toEqual([{ id: '1', name: 'foo' }]);
    });
  });

  describe('createTag', () => {
    it('should create a tag', () => {
      let tag: TagInterface | undefined;
      apiService.createTag('foo').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne(
        'http://localhost:3004.com/tags'
      );
      req.flush({ id: '1', name: 'foo' });
      expect(tag).toEqual({ id: '1', name: 'foo' });
    });
    // we should not test data but behavours of the service so the tests below are overkill as well but good to know
    it('should pass the correct body', () => {
      let tag: TagInterface | undefined;
      apiService.createTag('foo').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne(
        'http://localhost:3004.com/tags'
      );
      req.flush({ id: '1', name: 'foo' });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ name: 'foo' });
    });

    // create test to cover the error handling
    it('should throw an error if request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      apiService.createTag('foo').subscribe({
        next: () => {
          // explicitly marks a test as failed
          fail('Succsess should not be called');
        },
        error: (err) => {
          actualError = err;
        },
      });
      const req = httpTestingController.expectOne(
        'http://localhost:3004.com/tags'
      );
      req.flush('Server Error', {
        status: 422,
        statusText: 'Unprocessable Entity',
      });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessable Entity');
    });
  });
});
