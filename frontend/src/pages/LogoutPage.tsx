/**
 * @file src/pages/LogoutPage.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { users } from '../api'
import FlexBox from '../components/FlexBox'
import { useLastPath } from '../state/path'

export const LogoutPage: React.FC = () => {
  const logout = users.useLogout()
  const lastPath = useLastPath()
  const navigate = useNavigate()
  useEffect(() => {
    logout().then(() => navigate(lastPath))
  }, [lastPath, logout, navigate])
  return (
    <Box className='Logout-page'>
      <FlexBox justify='center'>
        <Typography variant='body1'>Logging out...</Typography>
      </FlexBox>
    </Box>
  )
}

export default LogoutPage

