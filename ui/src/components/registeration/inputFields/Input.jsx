import React from 'react'
import { nuicallback } from '../../../utils/nuicallback'
const Input = ({ name, placeholder, value, handleChange, label }) => {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label className='text-sm font-medium text-gray-300'>
          {label}
        </label>
      )}
      <input
        onChange={handleChange}
        type='text'
        name={name}
        placeholder={placeholder}
        value={value}
        onMouseEnter={() => nuicallback('hover')}
        className='flex h-9 w-full rounded-md border border-white/20 bg-white/5 px-3 py-1 text-sm text-white placeholder:text-gray-400 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
      />
    </div>
  )
}

export default Input
