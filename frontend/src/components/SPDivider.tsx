/**
 * @file src/components/SPDivider.tsx
 * @author John Carr
 * @license MIT
 */

import React from 'react'
import { Box, Divider, DividerProps } from '@mui/material'

export interface SPDividerProps extends DividerProps {
  bottom?: number | string
  horizontal?: number | string
  left?: number | string
  right?: number | string
  top?: number | string
  vertical?: number | string
}

export const SPDivider: React.FC<SPDividerProps> = ({
  horizontal = 0,
  vertical = 0,
  bottom,
  right,
  left,
  top,
  sx,
  ...props
}) => {
  return (
    <Box
      className='Side-padded-divider'
      sx={{
        ...sx,
        paddingBottom: bottom ?? vertical,
        paddingLeft: left ?? horizontal,
        paddingRight: right ?? horizontal,
        paddingTop: top ?? vertical,
      }}>
      <Divider {...props} />
    </Box>
  )
}

export default SPDivider

