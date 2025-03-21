import { format } from 'date-fns';

export const dateFormatterWithTime = (date: string | Date) =>
  format(new Date(date), 'HH:mm - dd.MM.yyyy');

export const dateToStringFormatter = (date: Date) =>
  format(new Date(date), 'yyyy-MM-dd');
