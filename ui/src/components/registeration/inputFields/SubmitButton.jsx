import React from 'react'
import plus from '../../../assets/plus.svg'
import { nuicallback } from '../../../utils/nuicallback'
const SubmitButton = () => {
  return (
    <button
      type='submit'
      onMouseEnter={() => nuicallback('hover')}
      className='inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50'
    >
      <img src={plus} alt='plus' className='w-4 h-4' />
      <span>Crear</span>
    </button>
  )
}

export default SubmitButton
