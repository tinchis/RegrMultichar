import React from 'react'
import plus from '../../../assets/plus.svg'
import { nuicallback } from '../../../utils/nuicallback'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SubmitButton = () => {
  return (
    <Button
      type='submit'
      onMouseEnter={() => nuicallback('hover')}
      className={cn(
        'w-full rounded-md bg-[rgba(255,255,255,1.0)] hover:bg-[rgba(255,255,255,0.8)] text-black font-medium px-4 py-2 flex items-center justify-center gap-2'
      )}
    >
      <img src={plus} alt='plus' className='w-4 h-4 invert' />
      Crear personaje
    </Button>
  )
}

export default SubmitButton
