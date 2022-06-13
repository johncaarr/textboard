import React from 'react'
import { useFormState } from '@johncaarr/formish'
import { requestThreadCreate } from '../modules/threads'

export interface AuthorProps {
  variant: 'Post' | 'Thread'
}

export const Author: React.FC<AuthorProps> = ({ variant }) => {
  const isThread = variant === 'Thread'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [values, errors, handleChange, handleSubmit] = useFormState({
    initialValues: {
      comment: '',
      options: '',
      subject: isThread ? '' : undefined,
    },
    onSubmit: (values) => {
      requestThreadCreate({ values: values })
    },
  })

  return (
    <div
      key='Author'
      style={{ border: '1px inset black', maxWidth: '375px', padding: '10px' }}>
      <form onSubmit={handleSubmit}>
        {variant === 'Thread' && (
          <div
            key='Subject-field'
            style={{ paddingLeft: '15px', paddingBottom: '5px' }}>
            <label htmlFor='subject'>subject: </label>
            <input
              id='subject'
              name='subject'
              type='text'
              value={values.subject}
              onChange={handleChange}
            />
          </div>
        )}
        <div
          key='Options-field'
          style={{ paddingLeft: '15px', paddingBottom: '5px' }}>
          <label htmlFor='options'>options: </label>
          <input
            id='options'
            name='options'
            type='text'
            value={values.options}
            onChange={handleChange}
          />
          <span>
            <input
              name='submit'
              type='submit'
              value='Post Thread'
              style={{ float: 'right', minWidth: '100px' }}
            />
          </span>
        </div>
        <div key='Comment-field'>
          <label htmlFor='comment'>comment: </label>
          <textarea
            id='comment'
            name='comment'
            rows={8}
            cols={40}
            value={values.comment}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  )
}

export default Author

