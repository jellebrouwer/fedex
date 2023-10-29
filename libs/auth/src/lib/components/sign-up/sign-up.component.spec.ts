import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { AuthService, IUser } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

const mockUserData: IUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'StrongPassword123',
};

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const authServiceMock = {
    signUp: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit the form and display success message', fakeAsync(() => {
    component.signUpForm.patchValue(mockUserData);

    component.onSubmit();
    expect(authServiceMock.signUp).toHaveBeenCalledWith(mockUserData);

    // Simulate API response after form submission
    tick();
    fixture.detectChanges();
    expect(component.isLoading).toBe(false);
    expect(component.isSubmitted).toBe(true);

    const successMessage =
      fixture.nativeElement.querySelector('.alert-success');
    expect(successMessage.textContent.trim()).toBe('Sign up successful.');
  }));

  describe('Validation', () => {
    it('should handle form validation errors', () => {
      const firstNameControl = component.signUpForm.get('firstName');
      firstNameControl?.setValue('');
      firstNameControl?.markAsTouched();
      expect(component.hasErrors('firstName')).toBeTruthy();
      expect(component.getValidationMessage('firstName')).toBe(
        'First name is required.'
      );
    });
  });

  describe('Full name', () => {
    it('should show the full name based on first and last name', () => {
      component.signUpForm.patchValue(mockUserData);
      fixture.detectChanges();
      const fullName = fixture.nativeElement.querySelector('.full-name');
      expect(fullName.textContent.trim()).toBe(
        `${mockUserData.firstName} ${mockUserData.lastName}`
      );
    });
  });

  describe('API returns error', () => {
    it('should display an error message', fakeAsync(() => {
      const mockError = 'Something went wrong';
      authServiceMock.signUp.mockReturnValue(throwError(mockError));

      component.onSubmit();

      // Simulate API error response after form submission
      tick();
      fixture.detectChanges();
      expect(component.isLoading).toBe(false);
      expect(component.error).toBe(mockError);

      const errorMessage = fixture.nativeElement.querySelector(
        '.alert.alert-danger'
      );
      expect(errorMessage.textContent.trim()).toContain(
        'Oops. Somehting went wrong.'
      );
    }));
  });
});
