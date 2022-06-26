/**
 * Helper functions for date/time processing
 * @file src/modules/date.ts
 * @author John Carr
 * @license MIT
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

export const getDateString = (date: Date): string =>
  `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} 
  (${getWeekDay(date).substring(0, 3)}) 
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

