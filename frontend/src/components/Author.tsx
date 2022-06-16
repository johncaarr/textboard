import React from 'react'
import { Box, Button } from '@mui/material'
import { useFormState } from '@johncaarr/formish'
import post from '../api/posts'
import thread from '../api/threads'
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
        post.create({ values: inputValues })
      } else {
        thread.create({ values: inputValues })
      }
    },
  })
  return (
    <Box
      key='Author'
      sx={{ border: '1px inset black', maxWidth: '500px', padding: '10px' }}>
      <form onSubmit={handleSubmit}>
        {isThread && (
          <Box key='Subject-field'>
            <TextInput
              label='Subject'
              name='subject'
              value={values.subject}
              errval={errors.subject}
              onFormChange={handleChange}
            />
          </Box>
        )}
        <Box key='Options-field'>
          <TextInput
            label='Options'
            name='options'
            value={values.options}
            errval={errors.options}
            onFormChange={handleChange}
          />
          <Box component='span'>
            <Button
              color='primary'
              name='submit'
              type='submit'
              value='Post Thread'
              variant='contained'
              sx={{ float: 'right', minWidth: '100px' }}
            />
          </Box>
        </Box>
        <Box key='Comment-field'>
          <TextInput
            fullWidth
            multiline
            minRows={6}
            label='Comment'
            name='comment'
            value={values.comment}
            errval={errors.comment}
            onFormChange={handleChange}
          />
        </Box>
      </form>
    </Box>
  )
}

export default Author

