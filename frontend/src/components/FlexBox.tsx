import React from 'react'
import { Box, BoxProps } from '@mui/material'

export interface FlexBoxProps extends BoxProps {
  justify: string
}

export const FlexBox: React.FC<FlexBoxProps> = ({
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
        alignItems: 'center',
        justifyContent: justify,
      }}>
      {children}
    </Box>
  )
}

export default FlexBox

