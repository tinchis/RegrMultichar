import React from 'react'
import { nuicallback } from '../../../utils/nuicallback'
const RangeSlider = ({ height, handleChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-gray-400'>Altura</span>
        <span className='text-sm font-medium text-white'>{height}cm</span>
      </div>
      <div className='relative flex items-center w-full'>
        <div className='flex items-center w-full h-1.5 bg-gray-900 rounded-full relative'>
          <div
            style={{ width: `${(height / 300) * 100}%` }}
            className='absolute h-full bg-white rounded-full transition-all'
          />
          <input
            type='range'
            min='1'
            max='300'
            className='appearance-none w-full h-1.5 bg-transparent cursor-pointer z-10 range-slider'
            name='height'
            onClick={() => nuicallback('click')}
            onMouseEnter={() => nuicallback('hover')}
            onChange={handleChange}
            value={height}
          />
        </div>
      </div>
    </div>
  )
}

export default RangeSlider
