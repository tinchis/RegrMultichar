import React, { useState } from 'react'
import { countriesList } from '../../../utils/coutries'
import { nuicallback } from '../../../utils/nuicallback'
import { useConfig } from '../../../providers/configprovider'
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import arrow from '../../../assets/arrow.png'

const Option = ({ name, handleChange, optionsPopup, handleOptionsPopup }) => {
  const [selectedCountry, setSelecetedCountry] = useState('')
  const [searchCountry, setSearchCountry] = useState('')

  const handleSelectCountry = (value) => {
    setSelecetedCountry(value)
    const e = { target: { name, value } }
    handleChange(e)
    handleOptionsPopup()
    nuicallback('click')
  }

  const { config } = useConfig();

  const handleSearch = e => setSearchCountry(e.target.value)

  const filteredCountries = countriesList.filter(c => {
    if (c.toLocaleLowerCase().includes(searchCountry.toLocaleLowerCase())) {
      return c
    }
    return ''
  })

  return (
    <div className='w-full relative'>
      <Select open={optionsPopup}>
        <SelectTrigger
          type='button'
          onClick={handleOptionsPopup}
          onMouseEnter={() => nuicallback('hover')}
          className={cn(
            'text-start w-full border-[1px] border-white focus:outline-none text-white px-3 py-[6px] hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.5)] relative flex items-center justify-between'
          )}
        >
          <SelectValue placeholder={selectedCountry || config.Lang.nationality} className='flex-1 text-left text-xs'>
            {selectedCountry || config.Lang.nationality}
          </SelectValue>
          <img
            style={{ transform: optionsPopup ? 'rotate(90deg)' : 'rotate(0deg)' }}
            className='w-4 h-4 flex-shrink-0 transition-transform pointer-events-none'
            src={arrow}
            alt=""
          />
        </SelectTrigger>
        {optionsPopup && (
          <SelectContent
            className={cn(
              'bg-[rgba(0,0,0,1)] p-0 overflow-hidden right-0 top-full mt-1 max-h-[300px] flex flex-col'
            )}
          >
            <div className='p-3 border-b border-white/10'>
              <Input
                type='text'
                placeholder={config.Lang.searchcountry}
                onChange={handleSearch}
                value={searchCountry}
                className='bg-[rgba(255,255,255,0.1)] text-white w-full focus:outline-none focus:bg-[rgba(255,255,255,0.15)] border-0 placeholder:text-xs'
              />
            </div>
            <div className='overflow-y-scroll scrollbar-thumb-white scrollbar-track-black scrollbar-thin'>
              {filteredCountries.map(c => (
                <SelectItem
                  key={c}
                  onClick={() => handleSelectCountry(c)}
                  onMouseEnter={() => nuicallback('hover')}
                  className={cn(
                    'text-white hover:text-black hover:bg-white cursor-pointer rounded-none px-3 py-2'
                  )}
                >
                  {c}
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        )}
      </Select>
    </div>
  )
}

export default Option
