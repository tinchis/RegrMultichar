import React from 'react'
import { nuicallback } from '../../../utils/nuicallback'

const OptionGender = ({gValue, value, handleChange}) => {
  return (
    <input
      type='button'
      className={`flex-1 h-10 rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 ${
        gValue === value 
          ? 'bg-white text-black border-white' 
          : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-700'
      }`}
      name='gender'
      onMouseEnter={() => nuicallback('hover')}
      onClick={handleChange}
      value={value}
    />
  )
}

export default OptionGender
