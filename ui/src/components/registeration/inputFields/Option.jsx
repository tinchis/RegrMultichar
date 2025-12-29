import React, { useState } from 'react'
import { countriesList } from '../../../utils/coutries'
import { nuicallback } from '../../../utils/nuicallback'
import { useConfig } from '../../../providers/configprovider'
import arrow from '../../../assets/arrow.png'


const Option = ({ name, handleChange, optionsPopup, handleOptionsPopup }) => {
  const [selectedCountry, setSelecetedCountry] = useState('')
  const [searchCountry, setSearchCountry] = useState('')
  const handleSelectCountry = e => {
    setSelecetedCountry(e.target.value)
    handleChange(e)
    handleOptionsPopup()
    nuicallback('click')
  }

  const { config } = useConfig();

  const handleSearch = e => setSearchCountry(e.target.value)

  return (
    <div className='flex flex-col gap-2 relative'>
      <label className='text-sm font-medium text-gray-400'>
        {config.Lang.nationality}
      </label>
      <div className='relative'>
        <button
          type='button'
          onClick={handleOptionsPopup}
          onMouseEnter={() => nuicallback('hover')}
          className='flex h-10 w-full items-center justify-between rounded-md border border-gray-800 bg-gray-900/50 px-3 py-2 text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:border-gray-700 hover:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <span className={selectedCountry ? 'text-white' : 'text-gray-500'}>
            {selectedCountry || config.Lang.nationality}
          </span>
          <img
            style={{ transform: optionsPopup ? 'rotate(90deg)' : 'rotate(0deg)' }}
            className='w-4 h-4 opacity-60 transition-transform'
            src={arrow}
            alt=""
          />
        </button>
      </div>
      <div
        className={`absolute top-full left-0 right-0 z-50 mt-2 rounded-md border border-gray-800 bg-gray-950 shadow-xl ${optionsPopup ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 invisible'
          } transition-all overflow-hidden`}
      >
        <div className='p-2 border-b border-gray-800'>
          <input
            type='text'
            placeholder={config.Lang.searchcountry}
            onChange={handleSearch}
            className='flex h-9 w-full rounded-md border border-gray-800 bg-gray-900/50 px-3 py-1 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700'
          />
        </div>
        <ul className='max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent'>
          {countriesList
            .filter(c => {
              if (
                c.toLocaleLowerCase().includes(searchCountry.toLocaleLowerCase())
              ) {
                return c
              }
              return ''
            })
            .map(c => (
              <li key={c}>
                <button
                  onClick={handleSelectCountry}
                  onMouseEnter={() => nuicallback('hover')}
                  name={name}
                  value={c}
                  type='button'
                  className='w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-gray-900 hover:text-white transition-colors'
                >
                  {c}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Option
