import { dateToTimeStringFormatter } from '@/utils/date';
import { addMinutes, setHours, setMinutes } from 'date-fns';
import { LocaleConfig } from 'react-native-calendars';

const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
export const findMissingDaysInWeek = (daysArray: number[]) =>
  daysOfWeek.filter((day) => !daysArray.includes(day));

export const generateTimeSlots = (
  duration: number,
  existingSlots: Date[],
): string[] => {
  const slots = [];
  const existingSlotsToString: string[] = existingSlots.map((slot) =>
    dateToTimeStringFormatter(slot),
  );

  let time = setMinutes(setHours(new Date(), 9), 0); // Start at 9:00 AM
  while (time.getHours() < 17) {
    // Until 5:00 PM
    const slotString = dateToTimeStringFormatter(time);
    if (!existingSlotsToString.includes(slotString)) {
      slots.push(dateToTimeStringFormatter(time));
    }
    time = addMinutes(time, duration);
  }
  return slots;
};

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
