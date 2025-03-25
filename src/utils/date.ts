import { addDays, addMinutes, format, getDay, min } from 'date-fns';

export const dateFormatterWithTime = (date: string | Date) =>
  format(new Date(date), 'HH:mm - dd.MM.yyyy');

export const dateToStringFormatter = (date: Date) => format(date, 'yyyy-MM-dd');
export const dateToTimeStringFormatter = (date: Date) => format(date, 'H:mm');

export const getClosestDate = (days: number[], duration: number): Date => {
  const today = new Date();
  const todayDay = getDay(today);

  if (
    days.includes(todayDay) &&
    today.getHours() < 17 &&
    addMinutes(today, duration).getHours() < 17
  ) {
    return today;
  }

  const possibleDates = days.map((day) => {
    const diff = (day - todayDay + 7) % 7 || 7;
    return addDays(today, diff);
  });

  return min(possibleDates);
};
