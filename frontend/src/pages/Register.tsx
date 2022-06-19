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
import React from 'react'
import { Link } from 'react-router-dom'
import { useFormState, validations } from '@johncaarr/formish'

import { users } from '../api'
import storage from '../modules/storage'
import Center from '../components/Center'
import TextInput from '../components/TextInput'

export const RegisterPage: React.FC = () => {
  users.useLoginRedirectEffect()
  const register = users.useRegister()
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: {
      email: '',
      username: '',
      password: '',
      remember: storage.get(localStorage, 'remember', true) as boolean,
    },
    validationSchema: {
      username: (value) => [
        !validations.isLength(value, 3),
        'Username must be 3 or more characters',
      ],
      email: (value) => [validations.isEmail(value), 'Invalid email address'],
      password: (value) => [
        validations.isLength(value, 8),
        'Must be 8 or more characters',
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
  return (
    <Box className='Register-page'>
      <Container sx={{ padding: 3, width: '50ch' }}>
        <Paper variant='outlined'>
          <Center>
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant='h4'>User Registration</Typography>
            </Box>
          </Center>
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
                <Center>
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
                </Center>
              </Grid>
              <Grid item xs={12}>
                <Center>
                  <Button
                    color='success'
                    size='large'
                    type='submit'
                    variant='contained'>
                    Submit Registration
                  </Button>
                </Center>
                <Center>
                  <Typography variant='subtitle1' sx={{ paddingTop: '15px' }}>
                    <Link to='/login'>Already have an account? Login here</Link>
                  </Typography>
                </Center>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default RegisterPage
