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
import { useNavigate, Link } from 'react-router-dom'
import { useFormState, validations } from '@johncaarr/formish'

import users from '../api/users'
import storage from '../modules/storage'
import Center from '../components/Center'
import TextInput from '../components/TextInput'
import { useAppSelector } from '../state/hooks'

export const LoginPage: React.FC = () => {
  const login = users.useLogin()
  const navigate = useNavigate()
  const session = useAppSelector((state) => state.session)
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
    if (session?.user) navigate('/')
  }, [navigate, session, session.user])

  return (
    <Box className='Login-page'>
      <Container sx={{ padding: 3, width: '50ch' }}>
        <Paper elevation={12}>
          <Center>
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant='h4'>User Login</Typography>
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
                    label='Remember my login info'
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
                    Submit Login
                  </Button>
                </Center>
                <Center>
                  <Typography variant='subtitle1' sx={{ paddingTop: '15px' }}>
                    <Link to='/register'>
                      Don't have an account? Register here
                    </Link>
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

export default LoginPage
