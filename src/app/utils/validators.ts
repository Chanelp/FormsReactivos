import { AbstractControl } from '@angular/forms';
import { CategoriesService } from '../core/services/categories.service';
import { map } from 'rxjs/operators';

export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validatePassword(control: AbstractControl) {
    const value = control.value;
    if (!MyValidators.containsNumber(value)) {
      return { invalid_password: true };
    }
    return null;
  }

  private static containsNumber(value: string): boolean {
    return value.split('').some((w) => MyValidators.isNumber(w)) !== undefined;
  }
  private static isNumber(value: string): boolean {
    return !isNaN(parseInt(value, 10));
  }

  static matchPasswords(control: AbstractControl) {
    const password = control.value.password;
    const confirmPassword = control.value.confirmPassword;
    if (password === confirmPassword) {
      return null;
    }
    return { match_password: true };
  }

  static validateCategory(service: CategoriesService){
    return (control: AbstractControl) => {
      const value = control.value;

      return service.checkCategory(value)
      .pipe(
        map((response: any) => {
          const isAvailable = response.isAvailable;
          console.log(isAvailable);

          if(!isAvailable){
            return { not_available: true }
          }
          return null;
        })
      );
    }
  }
}
