/**
 * Storage access using prefix key
 * Designed to be used with forms in mind
 * @file src/modules/storage.ts
 * @author John Carr
 * @license MIT
 */
import type { Get, Set } from '../types'

export namespace storage {
  export const get: Get = (store, key, def = '') => {
    return store.getItem(key) ?? def
  }

  export const set: Set = (store, key, val) => {
    return store.setItem(key, val)
  }
}

export default storage

