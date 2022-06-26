/**
 * @file src/modules/storage.ts
 * @author John Carr
 * @license MIT
 */
import type { Get, Set } from '../types'

export namespace storage {
  export const get: Get = (store, key, def = '') => store.getItem(key) ?? def

  export const set: Set = (store, key, val) => store.setItem(key, val)
}

export default storage

