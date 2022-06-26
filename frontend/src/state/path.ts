/**
 * @file src/state/path.ts
 * @author John Carr
 * @license MIT
 */

import { useLocation } from 'react-router-dom'
import type { LinkState } from '../types'

export const useLastPath = (): string => {
  let lastPath = '/'
  const { state } = useLocation()
  if (state) lastPath = (state as LinkState).lastpath ?? '/'
  return lastPath
}

