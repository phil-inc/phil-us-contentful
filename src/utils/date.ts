import { utcToZonedTime, format } from "date-fns-tz";

import { TIME_ZONE_USA } from './../constants/global.constant';

export function convertTimeToCustomFormat(
  inputTimeStr: string,
  formatStr: string,
): string {
  // Define the time zone to convert to
  const timeZone = "America/Los_Angeles";

  // Convert the input time to the defined time zone
  const zonedDate = utcToZonedTime(inputTimeStr, timeZone);

  // Format the zoned date to the desired string format
  const output = format(zonedDate, formatStr, { timeZone }).replace(
    /(AM|PM)/,
    (match) => match.toLowerCase(),
  );

  return output;
}

// format date into "Month day, year"
export function convertDateToCustomFormat(date: string): string {
  const validDate = isValidDateString(date) 
    ? new Date(date) 
    : new Date();
  return format(validDate, "MMMM d, yyyy", { timeZone: TIME_ZONE_USA });
}

export const isValidDateString = (dateString: string):boolean => {
  const parsedate = Date.parse(dateString);
  return !isNaN(parsedate);
}
