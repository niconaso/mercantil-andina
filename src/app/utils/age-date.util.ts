import subYears from 'date-fns/subYears';

const LEGAL_AGE: number = 18;
const OLD_AGE: number = 99;

/**
 * Returns the min date to be legal
 *
 * @return {*}
 */
export const legalAgeDate = () => {
  return subYears(new Date(), LEGAL_AGE);
};

/**
 * Returns the max date allowed
 *
 * @return {*}
 */
export const oldAgeDate = () => {
  return subYears(new Date(), OLD_AGE);
};
