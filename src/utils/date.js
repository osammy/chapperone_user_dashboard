function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  const number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === 'object' && argStr === '[object Date]')
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if (
      (typeof argument === 'string' || argStr === '[object String]') &&
      typeof console !== 'undefined'
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule",
      );
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

function addDays(dirtyDate, dirtyAmount) {
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  date.setDate(date.getDate() + amount);
  return date;
}

function addWeeks(dirtyDate, dirtyAmount) {
  const amount = toInteger(dirtyAmount);
  const days = amount * 7;
  return addDays(dirtyDate, days);
}

function startOfDay(dirtyDate) {
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isYesterday(dirtyDate) {
  return isSameDay(dirtyDate, subDays(Date.now(), 1));
}

function isSameDay(dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

function subDays(dirtyDate, dirtyAmount) {
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

function isToday(dirtyDate) {
  return isSameDay(dirtyDate, Date.now());
}

function addMonths(dirtyDate, dirtyAmount) {
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }
  var dayOfMonth = date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 1, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth,
    );
    return date;
  }
}

function addYears(dirtyDate, dirtyAmount) {
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

function subYears(dirtyDate, dirtyAmount) {
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}
//

const months = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getDayFormat(day) {
  switch (day) {
    case 1:
      var format = 'st';
      break;
    case 2:
      var format = 'nd';
      break;
    case 3:
      var format = 'rd';
      break;
    default:
      var format = 'th';
  }
  return format;
}
const compareAsc = (dirtyDateLeft, dirtyDateRight) => {
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);

  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
};
function compareLocalAsc(dateLeft, dateRight) {
  var diff =
    dateLeft.getFullYear() - dateRight.getFullYear() ||
    dateLeft.getMonth() - dateRight.getMonth() ||
    dateLeft.getDate() - dateRight.getDate() ||
    dateLeft.getHours() - dateRight.getHours() ||
    dateLeft.getMinutes() - dateRight.getMinutes() ||
    dateLeft.getSeconds() - dateRight.getSeconds() ||
    dateLeft.getMilliseconds() - dateRight.getMilliseconds();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

const getTimezoneOffsetInMilliseconds = (dirtyDate) => {
  const MILLISECONDS_IN_MINUTE = 60000;
  function getDateMillisecondsPart(date) {
    return date.getTime() % MILLISECONDS_IN_MINUTE;
  }
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());
  date.setSeconds(0, 0);
  var hasNegativeUTCOffset = baseTimezoneOffset > 0;
  var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset
    ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) %
      MILLISECONDS_IN_MINUTE
    : getDateMillisecondsPart(date);

  return (
    baseTimezoneOffset * MILLISECONDS_IN_MINUTE +
    millisecondsPartOfTimezoneOffset
  );
};

const differenceInCalendarDays = (dirtyDateLeft, dirtyDateRight) => {
  var MILLISECONDS_IN_DAY = 86400000;
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);

  var timestampLeft =
    startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight =
    startOfDayRight.getTime() -
    getTimezoneOffsetInMilliseconds(startOfDayRight);

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
};

export const differenceInCalendarMonths = (dirtyDateLeft, dirtyDateRight) => {
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();

  return yearDiff * 12 + monthDiff;
};

function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);

  return dateLeft.getFullYear() - dateRight.getFullYear();
}

export const formatDate = (date, divider) => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  let day = date.getDate();
  let month = date.getMonth(); //Be careful! January is 0 not 1
  let year = date.getFullYear();

  const monthInString = months[month];

  if (divider) {
    day = day >= 10 ? day : '0' + day;
    month = month + 1 >= 10 ? month + 1 : '0' + (month + 1);

    return `${day}${divider}${month}${divider}${year}`;
  }

  return `${day} ${monthInString} ${year}`;
};

export const differenceInDays = (dirtyDateLeft, dirtyDateRight) => {
  const dateLeft = toDate(dirtyDateLeft);
  const dateRight = toDate(dirtyDateRight);

  const sign = compareLocalAsc(dateLeft, dateRight);
  const difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));

  dateLeft.setDate(dateLeft.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastDayNotFull = compareLocalAsc(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastDayNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
};
const differenceInWeeks = (dirtyDateLeft, dirtyDateRight) => {
  const diff = differenceInDays(dirtyDateLeft, dirtyDateRight) / 7;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
};

const differenceInMonths = (dirtyDateLeft, dirtyDateRight) => {
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);

  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  dateLeft.setMonth(dateLeft.getMonth() - sign * difference);

  // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastMonthNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
};
const differenceInYears = (dirtyDateLeft, dirtyDateRight) => {
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);

  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarYears(dateLeft, dateRight));

  // Set both dates to a valid leap year for accurate comparison when dealing
  // with leap days
  dateLeft.setFullYear('1584');
  dateRight.setFullYear('1584');

  // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastYearNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
};
export const formatTime = (date) => {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  let hrs = date.getHours();
  let mins = date.getMinutes(); //Be careful! January is 0 not 1

  if (hrs <= 9) {
    hrs = `0${hrs}`;
  }
  if (mins <= 9) {
    mins = `0${mins}`;
  }

  return `${hrs}:${mins}`;
};

export const formatDateTime = (someDate) => {
  if (typeof someDate === 'number' || typeof someDate === 'string') {
    someDate = new Date(someDate);
  }

  if (isToday(someDate)) {
    return formatTime(someDate);
  }

  if (isYesterday(someDate)) {
    return 'Yesterday';
  }

  return formatDate(someDate, '/');
};

export const formatFullDateTime = (dateToFormat) => {
  let day = '';
  if (typeof dateToFormat === 'string') {
    dateToFormat = new Date(dateToFormat);
  }

  if (isToday(dateToFormat)) {
    day = 'Today';
  } else if (isYesterday(dateToFormat)) {
    day = 'Yesterday';
  } else {
    day = formatDate(dateToFormat);
  }

  const theTime = formatTime(dateToFormat);

  return `${day} ${theTime}`;
};

function decodeDateFromString(theDate, defaultType) {
  // if (defaultType) {
  //   // This is true when `theDate` is already in the `mm/dd/yy` format as opposed to the 'dd/mm/yy' format
  //   return new Date(theDate);
  // }
  let separator = '';
  if (theDate.includes('/')) {
    separator = '/';
  } else if (theDate.includes('-')) {
    separator = '-';
  } else {
    // console.log(new Date(theDate));
    return new Date(theDate);
  }

  const vals = theDate.split(separator);
  //convert incoming string from 'dd/mm/yy to 'mm/dd/yy'
  const newDateString = `${vals[1]}${separator}${vals[0]}${separator}${vals[2]}`;

  return new Date(newDateString);
}

export default {
  formatDate,
  formatFullDateTime,
  formatDateTime,
  formatTime,
  getDayFormat,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  addMonths,
  addWeeks,
  addDays,
  decodeDateFromString,
};
