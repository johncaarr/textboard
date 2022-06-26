/**
 * @file src/state/layout.ts
 * @author John Carr
 * @license MIT
 */

import { createContext, useContext } from 'react'
import type { LayoutContextParams, LayoutContextState } from '../types'

export const LayoutContext = createContext<LayoutContextParams>(undefined)
export const useLayoutContext = () =>
  useContext(LayoutContext) as LayoutContextState

