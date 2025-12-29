import React from 'react'
import { Input as ShadcnInput } from '@/components/ui/input'
import { nuicallback } from '../../../utils/nuicallback'
import { cn } from '@/lib/utils'

const Input = ({ name, placeholder, value, handleChange }) => {
  return (
    <ShadcnInput
      onChange={handleChange}
      type='text'
      name={name}
      placeholder={placeholder}
      value={value}
      onMouseEnter={() => nuicallback('hover')}
      className={cn(
        'border-[1px] w-[100%] border-white focus:outline-none hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.5)] text-white placeholder:text-white placeholder:text-xs px-3 py-[6px]'
      )}
    />
  )
}

export default Input
