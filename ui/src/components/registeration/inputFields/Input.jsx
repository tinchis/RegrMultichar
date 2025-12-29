import React from 'react'
import { nuicallback } from '../../../utils/nuicallback'
const Input = ({ name, placeholder, value, handleChange, label }) => {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className='text-sm font-medium text-gray-400'>
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
        className='flex h-10 w-full rounded-md border border-gray-800 bg-gray-900/50 px-3 py-2 text-sm text-white placeholder:text-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:border-gray-700 hover:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
      />
    </div>
  )
}

export default Input
