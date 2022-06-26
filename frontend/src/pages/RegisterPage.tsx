/**
 * @file src/pages/RegisterPage.tsx
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

export const RegisterPage: React.FC = () => {
  const register = users.useRegister()
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: {
      email: '',
      username: '',
      password: '',
      remember: storage.get(localStorage, 'remember', true) as boolean,
    },
    validationSchema: {
      username: [
        (value) => [
          validations.isLength(value, 3),
          'Username must be at least 3 characters',
        ],
        (value) => [
          validations.isLength(value, 3, 32),
          'Username must be 32 characters or less',
        ],
      ],
      email: [
        (value) => [
          validations.isLength(value, 5) && validations.isEmail(value),
          'Invalid email address',
        ],
        (value) => [
          validations.isLength(value, 5, 128),
          'Email must be 128 characters or less',
        ],
      ],
      password: [
        (value) => [
          validations.isLength(value, 8),
          'Password must be at least 8 characters',
        ],
        (value) => [
          validations.isLength(value, 8, 256),
          'Password must be 256 characters or less',
        ],
      ],
    },
    onSubmit: (values) => {
      const { username, email, password, remember } = values
      if (remember) {
        storage.set(localStorage, 'username', username)
        storage.set(localStorage, 'password', password)
      }
      register(username, email, password)
    },
  })

  useEffect(() => {
    document.title = 'textboard - Register'
  }, [])

  return (
    <Box className='Register-page'>
      <Container sx={{ padding: 3, width: '50ch' }}>
        <Paper variant='outlined'>
          <FlexBox justify='center'>
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant='h4'>User Registration</Typography>
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
                  name='email'
                  label='Email Address'
                  errval={errors.email}
                  value={values.email}
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
                    label='Remember my login for next time'
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
                    Submit Registration
                  </Button>
                </FlexBox>
                <FlexBox justify='center'>
                  <Typography variant='subtitle1' sx={{ paddingTop: '15px' }}>
                    <HRLink to='/login'>
                      Already have an account? Login here
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

export default RegisterPage
