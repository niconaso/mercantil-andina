import { City } from './city.interface';
import { Province } from './province.interface';

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
   * Province
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  province: Province;

  /**
   * City
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  city: City;

  /**
   * Address (plain text, could include number and floor)
   *
   * @type {string}
   * @memberof PersonalInformation
   */
  address: string;

  /**
   * User must be between 18 and 99 years old
   *
   * @type {Date}
   * @memberof PersonalInformation
   */
  birthDate: Date;

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
