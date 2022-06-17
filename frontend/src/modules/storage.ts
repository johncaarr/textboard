/**
 * Storage access using prefix key
 * Designed to be used with forms in mind
 * @file src/modules/storage.ts
 * @author John Carr
 * @license MIT
 */
import type { Get, Set } from '../types'

const STORAGE_KEY_PREFIX = 'textboard-storage-'

export namespace storage {
  /**
   *
   * @param store
   * @param key
   * @param def
   * @returns
   */
  export const get: Get = (store, key, def = '') => {
    return store.getItem(STORAGE_KEY_PREFIX + key) ?? def
  }

  /**
   *
   * @param store
   * @param key
   * @param val
   * @returns
   */
  export const set: Set = (store, key, val) => {
    return store.setItem(STORAGE_KEY_PREFIX + key, val)
  }
}

export default storage

