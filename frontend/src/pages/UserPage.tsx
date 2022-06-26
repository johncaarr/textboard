import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import { users } from '../api'
import FlexBox from '../components/FlexBox'
import { useAppSelector } from '../state/hooks'
import type { User } from '../types'

export const BoardPage: React.FC = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [userData, setUserData] = useState<Partial<User>>()
  const user = useAppSelector((state) => state.session?.user)

  useEffect(() => {
    if (!userData) {
      users.fetchOne({
        params: userId || (user && user.id.toString()) || '1',
        success: (result) => setUserData(result),
        failure: () => navigate('/'),
      })
    } else {
      document.title = `textboard - User ${userData.username}`
    }
  }, [navigate, user, userId, userData])

  return (
    <Box className='User-page'>
      {userData && (
        <Box className='User-page-internal'>
          <FlexBox justify='center'>
            <Typography variant='h3'>{userData.username}</Typography>
          </FlexBox>
          <FlexBox justify='center'>
            <Typography variant='h6'>{userData.date_joined}</Typography>
          </FlexBox>
        </Box>
      )}
    </Box>
  )
}

export default BoardPage

