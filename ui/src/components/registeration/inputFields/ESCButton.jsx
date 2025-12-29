import React from 'react'
import { useConfig } from '../../../providers/configprovider'
import { nuicallback } from '../../../utils/nuicallback'

const ESCButton = (data) => {
  const { config } = useConfig();
  return (
    <div className='flex items-center justify-center gap-2 mt-4'>
      <button
        onMouseEnter={() => nuicallback('hover')}
        onClick={data.exitfunc}
        className='inline-flex h-8 items-center justify-center rounded-md border border-white/20 bg-white/5 px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
      >
        {config.Lang.esc}
      </button>
      <span className='text-sm text-gray-400'>{config.Lang.back}</span>
    </div>
  )
}

export default ESCButton
