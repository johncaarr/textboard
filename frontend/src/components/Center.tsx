import React from 'react'
import { Box, BoxProps } from '@mui/material'

export const Center: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props} sx={{ display: 'flex', justifyContent: 'center' }}>
      {props.children}
    </Box>
  )
}

export default Center

