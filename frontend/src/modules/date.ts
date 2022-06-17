/**
 * Helper functions for date/time processing
 * @file src/modules/date.ts
 * @author John Carr
 * @license MIT
 */

/**
 * @param date Input date object
 * @returns Name of input object's day of the week
 */

export const getWeekDay = (date: Date): string => {
  switch (date.getDay()) {
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
    default:
      return 'Sunday'
  }
}

/**
 * @param date Input date object
 * @returns Formatted string to be used by threads and posts
 */

export const getDateString = (date: Date): string =>
  `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} 
  (${getWeekDay(date).substring(0, 3)}) 
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

