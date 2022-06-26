import React, { useState, ReactNode } from 'react'
import { isMobile } from 'react-device-detect'
import { LayoutContext } from '../../state/layout'

export interface LayoutProviderProps {
  children?: ReactNode | ReactNode[]
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [mobileState, setMobileState] = useState(isMobile)
  return (
    <LayoutContext.Provider value={{ mobileState, setMobileState }}>
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutProvider

