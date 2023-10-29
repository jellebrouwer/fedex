import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingComponent } from '@fedex/ui';
import {
  hasLowerAndUpperCaseValidator,
  isValidEmail,
  noInputValueValidator,
} from '../../validators';
import { AuthService, IUser } from '../../services/auth.service';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { inputFields } from './input-fields.constant';
import { getValidationMessages } from '../../validators/validation-messages.constant';

export const minLengthPassword = 8;
const firstNameControl = new FormControl('', [Validators.required]);

@Component({
  selector: 'fedex-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public isSubmitted = false;
  public isLoading = false;
  public error: object | undefined = undefined;
  public inputFields = inputFields;
  public fullName$: Observable<string> | undefined;

  public signUpForm = new FormGroup({
    firstName: firstNameControl,
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, isValidEmail]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(minLengthPassword),
      hasLowerAndUpperCaseValidator,
      noInputValueValidator(firstNameControl),
    ]),
  });

  constructor(private authService: AuthService) {
    this.setFullName();
  }

  public onSubmit() {
    this.isLoading = true;
    this.authService.signUp(this.signUpForm.value as IUser).subscribe(
      () => {
        this.isSubmitted = true;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.error = err;
      }
    );
  }

  public hasErrors(controlName: string): boolean {
    const control = this.getFormControl(controlName);
    return !!(control && control.errors && control.touched);
  }

  public getValidationMessage(controlName: string) {
    const control = this.getFormControl(controlName);
    if (!control.errors) {
      return '';
    }
    const validationErrorType = Object.keys(control.errors)[0];
    return getValidationMessages()[controlName][validationErrorType];
  }

  private getFormControl(key: string): FormControl {
    return this.signUpForm.get(key) as FormControl;
  }

  private setFullName(): void {
    const firstName$ = this.signUpForm.get('firstName')?.valueChanges;
    const lastName$ = this.signUpForm.get('lastName')?.valueChanges;
    this.fullName$ = combineLatest([
      firstName$?.pipe(startWith('')) || of(''),
      lastName$?.pipe(startWith('')) || of(''),
    ]).pipe(map(([firstName, lastName]) => `${firstName} ${lastName}`));
  }
}
