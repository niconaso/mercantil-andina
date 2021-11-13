import subYears from 'date-fns/subYears';

const LEGAL_AGE: number = 18;
export const legalAgeDate = () => {
  return subYears(new Date(), LEGAL_AGE);
};

const OLD_AGE: number = 99;
export const oldAgeDate = () => {
  return subYears(new Date(), OLD_AGE);
};
