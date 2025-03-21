import { addMinutes, format, setHours, setMinutes } from 'date-fns';
import { LocaleConfig } from 'react-native-calendars';

const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
export const findMissingDaysInWeek = (daysArray: number[]) =>
  daysOfWeek.filter((day) => !daysArray.includes(day));

const timeFormatString = 'H:mm';
export const generateTimeSlots = (
  duration: number,
  existingSlots: Date[],
): string[] => {
  const slots = [];
  const existingSlotsToString: string[] = existingSlots.map((slot) =>
    format(slot, timeFormatString),
  );

  let time = setMinutes(setHours(new Date(), 9), 0); // Start at 9:00 AM
  while (time.getHours() < 17) {
    // Until 5:00 PM
    const slotString = format(time, timeFormatString);
    if (!existingSlotsToString.includes(slotString)) {
      slots.push(format(time, timeFormatString));
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
