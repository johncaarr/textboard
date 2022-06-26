/**
 * @file src/pages/NotFoundPage.tsx
 * @author John Carr
 * @license MIT
 */

import React from 'react'
import { Box, Typography } from '@mui/material'

import FlexBox from '../components/FlexBox'
import SPDivider from '../components/SPDivider'

export const NotFound: React.FC = () => {
  return (
    <Box className='Not-found-page'>
      <SPDivider horizontal='10vw' vertical='50px' />
      <FlexBox justify='center'>
        <Typography variant='h1'>404</Typography>
      </FlexBox>
      <SPDivider horizontal='30vw' vertical='25px' />
      <FlexBox justify='center'>
        <Typography variant='h4'>Nothing is here {':~('}</Typography>
      </FlexBox>
    </Box>
  )
}

export default NotFound

