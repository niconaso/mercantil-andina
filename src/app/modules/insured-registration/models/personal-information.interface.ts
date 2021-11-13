import { Address } from './address.interface';

export interface PersonalInformation {
  idNumber: string;
  name: string;
  lastName: string;
  email?: string;
  cellphoneNumber?: string;
  phoneNumber?: string;
  address: Address;
  username: string;
  password: string;
}
