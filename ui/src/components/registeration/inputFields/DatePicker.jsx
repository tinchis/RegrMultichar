import React, { useState } from 'react'
import { monthNames } from '../../../utils/monthNames'
import {
  getNumberOfDaysInMonth,
  getYears,
  range
} from '../../../utils/dateHandler'
import { nuicallback } from '../../../utils/nuicallback'
import { useConfig } from '../../../providers/configprovider'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
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
    <div className='w-full relative'>
      <Popover open={dobVisible}>
        <PopoverTrigger asChild>
          <Button
            type='button'
            variant="outline"
            onClick={handleDate}
            onMouseEnter={() => nuicallback('hover')}
            className={cn(
              'w-full text-start border-[1px] border-white focus:outline-none text-white px-3 py-[6px] hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.5)] relative text-xs'
            )}
          >
            {buttonValue}
            <img className='absolute right-2 top-1/2 -translate-y-1/2 w-[13px]' src={calendericon} alt="" />
          </Button>
        </PopoverTrigger>
        {dobVisible && (
          <PopoverContent
            className={cn(
              'text-[13px] flex flex-col bg-[rgba(0,0,0,1)] p-0 overflow-hidden right-0 top-full mt-1'
            )}
          >
            <div className='flex justify-center items-start gap-3 p-3'>
              <div className='flex flex-col items-center min-w-[80px]'>
                <span className='text-white text-center mb-2 font-semibold'>{config.Lang.year}</span>
                <ul className='h-[230px] w-full overflow-y-scroll p-1 scrollbar-thumb-white scrollbar-track-black scrollbar-thin'>
                  {getYears(passCurrentYear).map(year => (
                    (year > config.mindob && year < config.maxdob) &&
                    <li key={year} className='w-full'>
                      <Button
                        type='button'
                        variant="ghost"
                        onClick={() => { setCurrentYear(year); nuicallback('click') }}
                        className={cn(
                          'w-full justify-center px-2 py-1 text-xs rounded-none',
                          year === currentYear ? 'text-black bg-white' : 'text-white hover:bg-white/20'
                        )}
                      >
                        {year}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col items-center min-w-[60px]'>
                <span className='text-white text-center mb-2 font-semibold'>{config.Lang.day}</span>
                <ul className='h-[230px] w-full overflow-y-scroll p-1 scrollbar-thumb-white scrollbar-track-black scrollbar-thin'>
                  {range(
                    1,
                    getNumberOfDaysInMonth(currentYear, currentMonth) + 1
                  ).map(day => (
                    <li key={day} className='w-full'>
                      <Button
                        type='button'
                        variant="ghost"
                        onClick={() => { setCurrentDay(day); nuicallback('click') }}
                        className={cn(
                          'w-full justify-center px-2 py-1 text-xs rounded-none',
                          day === currentDay ? 'text-black bg-white' : 'text-white hover:bg-white/20'
                        )}
                      >
                        {day}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col items-center min-w-[100px]'>
                <span className='text-white text-center mb-2 font-semibold'>{config.Lang.month}</span>
                <ul className='h-[230px] w-full overflow-y-scroll p-1 scrollbar-thumb-white scrollbar-track-black scrollbar-thin'>
                  {monthNames.map((month, i) => (
                    <li key={i} className='w-full'>
                      <Button
                        type='button'
                        variant="ghost"
                        onClick={() => { setCurrentMonth(i); nuicallback('click') }}
                        className={cn(
                          'w-full justify-center px-2 py-1 text-xs rounded-none',
                          i === currentMonth ? 'text-black bg-white' : 'text-white hover:bg-white/20'
                        )}
                      >
                        {month}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='p-2 flex justify-end bg-[rgba(255,255,255,0.05)]'>
              <Button
                onClick={handleDateChange}
                onMouseEnter={() => nuicallback('hover')}
                type='button'
                variant="default"
                className='bg-slate-50 hover:bg-white text-black px-4 py-1 text-xs'
              >
                {config.Lang.done}
              </Button>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}

export default DatePicker
