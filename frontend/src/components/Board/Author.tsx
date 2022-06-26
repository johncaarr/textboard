/**
 * @file src/components/Board/Author.tsx
 * @author John Carr
 * @license MIT
 */

import React from 'react'
import { Box, Button, Grid, Paper } from '@mui/material'
import { useFormState, validations } from '@johncaarr/formish'

import TextInput from '../TextInput'
import { posts, threads } from '../../api'
import type { AuthorInput } from '../../types'

const initialFormValues: AuthorInput = {
  comment: '',
  options: '',
  subject: '',
}

export interface AuthorProps {
  board?: string
  thread?: number
  variant: 'Post' | 'Thread'
}

export const Author: React.FC<AuthorProps> = ({ board, thread, variant }) => {
  const isThread = variant === 'Thread'
  const createPost = posts.useCreatePost()
  const createThread = threads.useCreateThread()

  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: initialFormValues,
    validationSchema: {
      comment: (value) => [
        validations.isLength(value, 0, 512),
        'Must be 512 characters or less',
      ],
      options: (value) => [
        validations.isLength(value, 0, 128),
        'Must be 128 characters or less',
      ],
      subject: (value) => [
        validations.isLength(value, 0, 64),
        'Must be 64 characters or less',
      ],
    },
    onSubmit: (values) => {
      const inputValues: Partial<AuthorInput> = {
        ...values,
        board: board,
        thread: thread,
      }
      if (!isThread) {
        delete inputValues.subject
        createPost({ values: inputValues })
      } else {
        createThread({ values: inputValues })
      }
    },
  })

  return (
    <Box
      key='Author'
      sx={{ minWidth: '375px', maxWidth: '500px', padding: '10px' }}>
      <Paper variant='outlined' sx={{ padding: '15px' }}>
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

