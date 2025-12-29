import React, { useState } from 'react'
import { monthNames } from '../../../utils/monthNames'
import {
  getNumberOfDaysInMonth,
  getYears,
  range
} from '../../../utils/dateHandler'
import { nuicallback } from '../../../utils/nuicallback'
import { useConfig } from '../../../providers/configprovider'
import calendericon from '../../../assets/dob.png'
const passCurrentYear = new Date().getFullYear()

const DatePicker = ({ handleDate, dobVisible, handleChange }) => {
  const { config } = useConfig();
  

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(passCurrentYear)
  const [currentDay, setCurrentDay] = useState(new Date().getUTCDate())
  const [buttonValue, setButtonValue] = useState(config.Lang.dob)


  const handleDateChange = () => {
    const dob = {
      tag: 'DOB',
      value: currentYear + '/' + currentDay + '/' + (currentMonth + 1)
    }

    handleChange(dob)
    setButtonValue(dob.value)
    handleDate()
    nuicallback('click')
  }

  return (
    <div className='flex flex-col gap-1.5 relative'>
      <label className='text-sm font-medium text-gray-300'>
        {config.Lang.dob}
      </label>
      <div className='relative'>
        <button
          type='button'
          onClick={handleDate}
          onMouseEnter={() => nuicallback('hover')}
          className='flex h-9 w-full items-center justify-between rounded-md border border-white/20 bg-white/5 px-3 py-1 text-sm text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <span className={buttonValue !== config.Lang.dob ? 'text-white' : 'text-gray-400'}>
            {buttonValue}
          </span>
          <img className='w-4 h-4' src={calendericon} alt="" />
        </button>
      </div>
      <div
        className={`absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg ${
          dobVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden transition-all`}
      >
        <div className='flex justify-center items-center p-4 gap-4'>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-xs font-medium text-gray-300 uppercase tracking-wider'>{config.Lang.year}</span>
            <ul className='h-[300px] w-20 overflow-y-auto rounded-md border border-white/20 bg-white/5 p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent'>
              {getYears(passCurrentYear).map(year => (
                (year > config.mindob && year < config.maxdob) &&
                <li key={year}>
                  <button
                    type='button'
                    onClick={() => {setCurrentYear(year); nuicallback('click')}}
                    className={`w-full rounded px-2 py-1 text-sm transition-colors ${
                      year === currentYear ? 'bg-white text-gray-900 font-medium' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-xs font-medium text-gray-300 uppercase tracking-wider'>{config.Lang.day}</span>
            <ul className='h-[300px] w-16 overflow-y-auto rounded-md border border-white/20 bg-white/5 p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent'>
              {range(
                1,
                getNumberOfDaysInMonth(currentYear, currentMonth) + 1
              ).map(day => (
                <li key={day}>
                  <button
                    type='button'
                    className={`w-full rounded px-2 py-1 text-sm transition-colors ${
                      day === currentDay ? 'bg-white text-gray-900 font-medium' : 'text-white hover:bg-white/10'
                    }`}
                    onClick={() => {setCurrentDay(day); nuicallback('click')}}
                  >
                    {day}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-xs font-medium text-gray-300 uppercase tracking-wider'>{config.Lang.month}</span>
            <ul className='h-[300px] w-24 overflow-y-auto rounded-md border border-white/20 bg-white/5 p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent'>
              {monthNames.map((month, i) => (
                <li key={i}>
                  <button
                    type='button'
                    onClick={() => {setCurrentMonth(i); nuicallback('click')}}
                    className={`w-full rounded px-2 py-1 text-sm transition-colors ${
                      i === currentMonth ? 'bg-white text-gray-900 font-medium' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {month}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='border-t border-white/10 p-3 flex justify-end'>
          <button
            onClick={handleDateChange}
            onMouseEnter={() => nuicallback('hover')}
            type='button'
            className='h-9 px-4 rounded-md bg-white text-gray-900 text-sm font-medium hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
          >
            {config.Lang.done}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
