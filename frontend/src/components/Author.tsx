import React from 'react'
import { Box, Button, Grid, Paper } from '@mui/material'
import { useFormState } from '@johncaarr/formish'
import posts from '../api/posts'
import threads from '../api/threads'
import TextInput from './TextInput'
import type { AuthorInput } from '../types'

const initialFormValues: AuthorInput = {
  comment: '',
  options: '',
  subject: '',
}

export interface AuthorProps {
  variant: 'Post' | 'Thread'
}

export const Author: React.FC<AuthorProps> = ({ variant }) => {
  const isThread = variant === 'Thread'
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      const inputValues: Partial<AuthorInput> = { ...values }
      if (!isThread) {
        delete inputValues.subject
        posts.create({ values: inputValues })
      } else {
        threads.create({ values: inputValues })
      }
    },
  })
  return (
    <Box
      key='Author'
      sx={{ minWidth: '375px', maxWidth: '500px', padding: '10px' }}>
      <Paper elevation={12} sx={{ padding: '15px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {isThread && (
                <Box key='Subject-field'>
                  <TextInput
                    fullWidth
                    label='Subject'
                    name='subject'
                    value={values.subject}
                    errval={errors.subject}
                    onFormChange={handleChange}
                  />
                </Box>
              )}
            </Grid>
            <Grid container item spacing={1} xs={12}>
              <Grid item xs={8}>
                <Box key='Options-field'>
                  <TextInput
                    fullWidth
                    label='Options'
                    name='options'
                    value={values.options}
                    errval={errors.options}
                    onFormChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  color='primary'
                  name='submit'
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{ float: 'right', minHeight: '90%' }}>
                  Post Thread
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box key='Comment-field'>
                <TextInput
                  fullWidth
                  multiline
                  required
                  minRows={6}
                  label='Comment'
                  name='comment'
                  value={values.comment}
                  errval={errors.comment}
                  onFormChange={handleChange}
                  helperText='comment required | markdown supported (no images)'
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default Author

