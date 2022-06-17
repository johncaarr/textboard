import React, { ReactNode } from 'react'
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  OutlinedInputProps,
  InputLabel,
} from '@mui/material'
import { FormChangeHandler } from '@johncaarr/formish'

export interface TextInputProps extends OutlinedInputProps {
  label: string
  value: string
  onFormChange: FormChangeHandler
  errval?: string
  fullWidth?: boolean
  helperText?: string | ReactNode | ReactNode[]
  name?: string
  required?: boolean
  type?: 'password' | 'text'
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  errval,
  label,
  value,
  required,
  fullWidth,
  helperText,
  onFormChange,
  ...props
}) => {
  const id = name ?? label
  return (
    <FormControl error={!!errval} fullWidth={fullWidth} required={required}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        {...props}
        fullWidth
        name={id}
        label={label}
        value={value}
        type={type ?? 'text'}
        onChange={onFormChange}
        aria-describedby={`${id}-text`}
      />
      <FormHelperText id={`${id}-text`}>{errval ?? helperText}</FormHelperText>
    </FormControl>
  )
}

export default TextInput
