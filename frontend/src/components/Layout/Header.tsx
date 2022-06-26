/**
 * @file src/components/Layout/Header.tsx
 * @author John Carr
 * @license MIT
 */

import React from 'react'
import { Typography } from '@mui/material'
import HRLink from '../HRLink'

export const Header: React.FC = () => {
  return (
    <HRLink to='/' style={{ color: 'black', textDecoration: 'none' }}>
      <Typography variant='h4' textAlign='center'>
        textboard
      </Typography>
    </HRLink>
  )
}

export default Header

