import React from 'react'
import { nuicallback } from '../../../utils/nuicallback'

const OptionGender = ({gValue, value, handleChange}) => {
  return (
    <input
      type='button'
      className={`flex-1 h-9 rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
        gValue === value 
          ? 'bg-white text-gray-900 border-white shadow-sm' 
          : 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30'
      }`}
      name='gender'
      onMouseEnter={() => nuicallback('hover')}
      onClick={handleChange}
      value={value}
    />
  )
}

export default OptionGender
