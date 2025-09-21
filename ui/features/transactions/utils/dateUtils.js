import { format, isToday, isYesterday, isThisYear } from 'date-fns';
import { es } from 'date-fns/locale';

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatRelativeDate = (date) => {
  if (isToday(date)) return 'Hoy';
  if (isYesterday(date)) return 'Ayer';
  if (isThisYear(date)) {
    return capitalize(format(date, "EEEE, d 'de' MMMM", { locale: es }));
  }
  return capitalize(
    format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es }),
  );
};
