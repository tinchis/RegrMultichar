import React, { useState } from 'react'
import OptionGender from './OptionGender'
import { nuicallback } from '../../../utils/nuicallback'

const SelectGender = ({ gValue, handleChange }) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-sm font-medium text-gray-300'>Género</span>
      <div className='flex gap-3'>
        {['Male', 'Female'].map(opt => (
          <OptionGender
            key={opt}
            gValue={gValue}
            value={opt}
            onclick={() => nuicallback('click')}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectGender
