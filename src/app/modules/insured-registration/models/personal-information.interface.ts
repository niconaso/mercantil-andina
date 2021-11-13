import { Address } from './address.interface';

export interface PersonalInformation {
  /**
   * User identification (eq: DNI)
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  idNumber: string;
  /**
   * Firstname of the User
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  name: string;

  /**
   *Lastname of the user
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  lastName: string;

  /**
   * Email
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  email?: string;

  /**
   * Mobile phone number
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  cellphoneNumber?: string;

  /**
   * Phone number
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  phoneNumber?: string;

  /**
   * User address
   *
   * @type {Address}
   * @memberof PersonalInformation
   */
  address: Address;

  /**
   * Username choosed must be available
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  username: string;

  /**
   * Medium/High level password
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  password: string;
}
