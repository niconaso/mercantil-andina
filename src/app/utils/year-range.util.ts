import format from 'date-fns/format';
import subYears from 'date-fns/subYears';

/**
 *
 *
 * @param {number} [range=0]
 * @return {*}
 */
export const yearsRangeFromToday = (range: number = 0): any => {
  let years: number[] = [];
  let currentDate: Date = new Date();

  for (let index = 0; index < range; index++) {
    const year: string = format(currentDate, 'yyyy');
    years = [...years, Number(year)];
    currentDate = subYears(currentDate, 1);
  }

  return years;
};
