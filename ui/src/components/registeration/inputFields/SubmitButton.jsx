import React from 'react'
import plus from '../../../assets/plus.svg'
import { nuicallback } from '../../../utils/nuicallback'
const SubmitButton = () => {
  return (
    <button
      type='submit'
      onMouseEnter={() => nuicallback('hover')}
      className='inline-flex h-9 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50'
    >
      <img src={plus} alt='plus' className='w-4 h-4' />
      <span>Crear</span>
    </button>
  )
}

export default SubmitButton
