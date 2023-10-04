import { utcToZonedTime, format } from 'date-fns-tz';

export function convertTimeToCustomFormat(inputTimeStr: string, formatStr: string): string {
  // Define the time zone to convert to
  const timeZone = 'America/Los_Angeles';

  // Convert the input time to the defined time zone
  const zonedDate = utcToZonedTime(inputTimeStr, timeZone);

  // Format the zoned date to the desired string format
  const output = format(zonedDate, formatStr, { timeZone }).replace(/(AM|PM)/, (match) => match.toLowerCase());

  return output;
}
