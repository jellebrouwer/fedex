import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  AuthService,
  IPhotosResponse,
  IUser,
  IUsersResopnse,
} from './auth.service';

const userData: IUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  password: 'password',
};

const mockPhotosResponse: IPhotosResponse = {
  albumId: 1,
  id: 1,
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
  title: 'Sample Title',
  url: 'https://example.com/photo.jpg',
};

const mockUserResponse: IUsersResopnse = {
  email: 'johndoe@example.com',
  firstName: 'John',
  id: 1,
  lastName: 'Doe',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
};

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('signUp', () => {
    it('should sign up a user', () => {
      authService.signUp(userData).subscribe((response) => {
        expect(response).toEqual(mockUserResponse);
      });

      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/photos/3'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPhotosResponse);

      const signUpRequest = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/users'
      );
      expect(signUpRequest.request.method).toBe('POST');
      // @typescript-eslint/no-unused-vars
      expect(signUpRequest.request.body).toEqual({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        thumbnailUrl: mockPhotosResponse.thumbnailUrl,
      });
      signUpRequest.flush(mockUserResponse);
    });
  });
});
