/**
 * @file src/pages/LoginPage.tsx
 * @author John Carr
 * @license MIT
 */

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useFormState, validations } from '@johncaarr/formish'

import { users } from '../api'
import storage from '../modules/storage'
import FlexBox from '../components/FlexBox'
import HRLink from '../components/HRLink'
import TextInput from '../components/TextInput'

export const LoginPage: React.FC = () => {
  const login = users.useLogin()
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: {
      password: (value) => [
        validations.isLength(value, 8),
        'Must be 8 or more characters',
      ],
    },
    onSubmit: (values) => {
      const { username, password, remember } = values
      if (remember) {
        storage.set(localStorage, 'username', username)
        storage.set(localStorage, 'password', password)
      }
      login(username, password)
    },
  })

  useEffect(() => {
    document.title = 'textboard - Login'
  }, [])

  return (
    <Box className='Login-page'>
      <Container sx={{ padding: 3, width: '50ch' }}>
        <Paper variant='outlined'>
          <FlexBox justify='center'>
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant='h4'>User Login</Typography>
            </Box>
          </FlexBox>
          <Box sx={{ padding: 2 }}>
            <Divider />
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  name='username'
                  label='Username'
                  errval={errors.username}
                  value={values.username}
                  onFormChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  required
                  fullWidth
                  name='password'
                  type='password'
                  label='Password'
                  errval={errors.password}
                  value={values.password}
                  onFormChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FlexBox justify='center'>
                  <FormControlLabel
                    label='Remember my login info'
                    control={
                      <Checkbox
                        name='remember'
                        checked={values.remember}
                        onChange={handleChange}
                      />
                    }
                  />
                </FlexBox>
              </Grid>
              <Grid item xs={12}>
                <FlexBox justify='center'>
                  <Button
                    color='success'
                    size='large'
                    type='submit'
                    variant='contained'>
                    Submit Login
                  </Button>
                </FlexBox>
                <FlexBox justify='center'>
                  <Typography variant='subtitle1' sx={{ paddingTop: '15px' }}>
                    <HRLink to='/register'>
                      Don't have an account? Register here
                    </HRLink>
                  </Typography>
                </FlexBox>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
