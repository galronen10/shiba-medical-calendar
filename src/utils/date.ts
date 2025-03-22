import { format } from 'date-fns';

export const dateFormatterWithTime = (date: string | Date) =>
  format(new Date(date), 'HH:mm - dd.MM.yyyy');

export const dateToStringFormatter = (date: Date) => format(date, 'yyyy-MM-dd');
export const dateToTimeStringFormatter = (date: Date) => format(date, 'H:mm');
