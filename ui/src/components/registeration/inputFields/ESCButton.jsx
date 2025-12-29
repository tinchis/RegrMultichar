import React from 'react'
import { useConfig } from '../../../providers/configprovider'
import { nuicallback } from '../../../utils/nuicallback'

const ESCButton = (data) => {
  const { config } = useConfig();
  return (
    <button
      onMouseEnter={() => nuicallback('hover')}
      onClick={data.exitfunc}
      className='inline-flex h-10 items-center justify-center rounded-md border border-gray-800 bg-transparent px-4 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700'
    >
      {config.Lang.esc}
    </button>
  )
}

export default ESCButton
