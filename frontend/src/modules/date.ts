/**
 * Helper functions for date/time processing
 * @file src/modules/date.ts
 * @author John Carr
 * @license MIT
 */

import { useLocale } from '../state/locale'

export const useWeekDay = () => {
  const locale = useLocale()
  return (date: Date) => {
    switch (date.getDay()) {
      case 1:
        return locale?.weekday.monday ?? 'Monday'
      case 2:
        return locale?.weekday.tuesday ?? 'Tuesday'
      case 3:
        return locale?.weekday.wednesday ?? 'Wednesday'
      case 4:
        return locale?.weekday.thursday ?? 'Thursday'
      case 5:
        return locale?.weekday.friday ?? 'Friday'
      case 6:
        return locale?.weekday.saturday ?? 'Saturday'
      default:
        return locale?.weekday.sunday ?? 'Sunday'
    }
  }
}

export const padTimeDigit = (input: number | string) =>
  String(input).padStart(2, '0')

export const useDateString = () => {
  const getWeekDay = useWeekDay()
  return (date: Date) =>
    `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} 
    (${getWeekDay(date).substring(0, 3)}) 
    ${padTimeDigit(date.getHours())}:${padTimeDigit(
      date.getMinutes()
    )}:${padTimeDigit(date.getSeconds())}`
}

