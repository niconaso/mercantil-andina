import { PasswordStrengthValue } from '@core/enums';

export interface PasswordStrength {
  id: number;
  value: PasswordStrengthValue;
  contains: string[];
  length: number;
}
