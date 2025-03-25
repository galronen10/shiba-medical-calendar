import { LocaleConfig } from 'react-native-calendars';

const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
export const findMissingDaysInWeek = (daysArray: number[]) =>
  daysOfWeek.filter((day) => !daysArray.includes(day));

LocaleConfig.locales.heb = {
  monthNames: [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ],
  dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
};
LocaleConfig.defaultLocale = 'heb';
