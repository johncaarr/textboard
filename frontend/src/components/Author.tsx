import React from 'react'
import { useFormState } from '@johncaarr/formish'

export interface AuthorProps {
  variant: 'Post' | 'Thread'
}

export const Author: React.FC<AuthorProps> = ({ variant }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: {
      subject: '',
      options: '',
      comment: '',
    },
    onSubmit: (values) => {
      // put api request here
    },
  })

  return (
    <div key='Author'>
      <form onSubmit={handleSubmit}>
        {variant === 'Thread' && (
          <div key='Subject-field'>
            <input
              name='subject'
              type='text'
              value={values.subject}
              onChange={handleChange}
            />
          </div>
        )}
        <div key='Options-field'>
          <input
            name='options'
            type='text'
            value={values.options}
            onChange={handleChange}
          />
        </div>
        <div key='Comment-field'>
          <input
            name='comment'
            type='text'
            multiple={true}
            value={values.comment}
            onChange={handleChange}
          />
        </div>
        <div key='Submit-input'>
          <input name='submit' type='submit' />
        </div>
      </form>
    </div>
  )
}

export default Author

