/**
 * @file src/components/FlexBox.tsx
 * @author John Carr
 * @license MIT
 */

import React from 'react'
import { Box, BoxProps } from '@mui/material'

export interface FlexBoxProps extends BoxProps {
  align?: string
  justify: string
}

export const FlexBox: React.FC<FlexBoxProps> = ({
  align = 'center',
  children,
  justify,
  sx,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        ...sx,
        display: 'flex',
        alignItems: align,
        justifyContent: justify,
      }}>
      {children}
    </Box>
  )
}

export default FlexBox

