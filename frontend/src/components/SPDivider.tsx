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
  bottom,
  horizontal = 0,
  left,
  right,
  top,
  vertical = 0,
  ...props
}) => {
  return (
    <Box
      className='Side-padded-divider'
      sx={{
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

