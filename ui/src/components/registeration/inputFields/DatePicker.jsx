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
    <div className='flex flex-col gap-2 relative'>
      <label className='text-sm font-medium text-gray-400'>
        {config.Lang.dob}
      </label>
      <div className='relative'>
        <button
          type='button'
          onClick={handleDate}
          onMouseEnter={() => nuicallback('hover')}
          className='flex h-10 w-full items-center justify-between rounded-md border border-gray-800 bg-gray-900/50 px-3 py-2 text-sm text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:border-gray-700 hover:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <span className={buttonValue !== config.Lang.dob ? 'text-white' : 'text-gray-500'}>
            {buttonValue}
          </span>
          <img className='w-4 h-4 opacity-60' src={calendericon} alt="" />
        </button>
      </div>
      <div
        className={`absolute top-full left-0 right-0 z-50 mt-2 rounded-md border border-gray-800 bg-gray-950 shadow-xl ${
          dobVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden transition-all`}
      >
        <div className='flex justify-center items-center p-4 gap-4'>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-xs font-medium text-gray-500 uppercase tracking-wider'>{config.Lang.year}</span>
            <ul className='h-[300px] w-20 overflow-y-auto rounded-md border border-gray-800 bg-gray-900/50 p-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent'>
              {getYears(passCurrentYear).map(year => (
                (year > config.mindob && year < config.maxdob) &&
                <li key={year}>
                  <button
                    type='button'
                    onClick={() => {setCurrentYear(year); nuicallback('click')}}
                    className={`w-full rounded px-2 py-1 text-sm transition-colors ${
                      year === currentYear ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-xs font-medium text-gray-500 uppercase tracking-wider'>{config.Lang.day}</span>
            <ul className='h-[300px] w-16 overflow-y-auto rounded-md border border-gray-800 bg-gray-900/50 p-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent'>
              {range(
                1,
                getNumberOfDaysInMonth(currentYear, currentMonth) + 1
              ).map(day => (
                <li key={day}>
                  <button
                    type='button'
                    className={`w-full rounded px-2 py-1 text-sm transition-colors ${
                      day === currentDay ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
            <span className='text-xs font-medium text-gray-500 uppercase tracking-wider'>{config.Lang.month}</span>
            <ul className='h-[300px] w-24 overflow-y-auto rounded-md border border-gray-800 bg-gray-900/50 p-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent'>
              {monthNames.map((month, i) => (
                <li key={i}>
                  <button
                    type='button'
                    onClick={() => {setCurrentMonth(i); nuicallback('click')}}
                    className={`w-full rounded px-2 py-1 text-sm transition-colors ${
                      i === currentMonth ? 'bg-white text-black font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {month}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='border-t border-gray-800 p-3 flex justify-end'>
          <button
            onClick={handleDateChange}
            onMouseEnter={() => nuicallback('hover')}
            type='button'
            className='h-10 px-4 rounded-md bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700'
          >
            {config.Lang.done}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DatePicker
