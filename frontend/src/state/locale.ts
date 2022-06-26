/**
 * @file src/state/locale.ts
 * @author John Carr
 * @license MIT
 */

import { useEffect, useState } from 'react'

import storage from '../modules/storage'
import type { Dict } from '../types'

const LOCALE_KEY = 'locale'
const LOCALE_LIST = ['eng']

export const getLocale = (): string =>
  storage.get(localStorage, LOCALE_KEY, 'eng')

export const setLocale = (locale: string) =>
  LOCALE_LIST.indexOf(locale) > -1 &&
  storage.set(localStorage, LOCALE_KEY, locale)

export const useLocale = () => {
  const locale = getLocale()
  const [localeSet, setLocaleSet] = useState<Dict>()
  useEffect(() => {
    import(`../locale/${locale}.json`)
      .catch((reason) => console.error(reason))
      .then((data) => data && setLocaleSet(data))
  }, [locale])
  return localeSet
}

