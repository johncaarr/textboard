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

import storage from '../modules/storage'
import Center from '../components/Center'
import TextInput from '../components/TextInput'
import { useAppSelector } from '../state/hooks'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: {
      email: storage.get(localStorage, 'email', '') as string,
      username: storage.get(localStorage, 'username', '') as string,
      password: storage.get(localStorage, 'password', '') as string,
      remember: storage.get(localStorage, 'remember', true) as boolean,
    },
    validationSchema: {
      email: (value) => [validations.isEmail(value), 'Invalid email address'],
      password: (value) => [
        validations.isLength(value, 8),
        'Must be 8 or more characters',
      ],
    },
    onSubmit: (values) => {},
  })

  const session = useAppSelector((state) => state.session)
  useEffect(() => {
    if (session.user) navigate('/menu')
  }, [navigate, session, session.user])

  return (
    <Box className='Register-page'>
      <Container sx={{ padding: 3, width: '50ch' }}>
        <Paper elevation={12}>
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
