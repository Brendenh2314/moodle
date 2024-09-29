'use client'
import { baseRating, gradients } from '@/utils'
import { Fugaz_One } from '@next/font/google'
import React, { useState } from 'react'

const months = {
  'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
  'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
  'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
}
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({
  weight: "400",
  variable: "--font-fugaz-one",
  subsets: ["latin"],
});

export default function Calendar(props) {
  const { demo, completeData, handleSetMood } = props
  const now = new Date()
  const currMonth = now.getMonth()
  const [selectedMonth, setSelecetedMonth] = useState(Object.keys(months)[currMonth])
  const [selectedYear, setSelecetedYear] = useState(now.getFullYear())

  const numericMonth = monthsArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}

  // Function to handle month increment or decrement
  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      // Move to the last month of the previous year
      setSelecetedYear(curr => curr - 1)
      setSelecetedMonth(monthsArr[monthsArr.length - 1])
    } else if (numericMonth + val > 11) {
      // Move to the first month of the next year
      setSelecetedYear(curr => curr + 1)
      setSelecetedMonth(monthsArr[0])
    } else {
      setSelecetedMonth(monthsArr[numericMonth + val])
    }
  }

  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
  const firstDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, numericMonth + 1, 0).getDate()

  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={() => handleIncrementMonth(-1)} className='mr-auto text-pink-400 text-lg sm:text-xl duration-200 hover:opacity-60'>
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p className={'text-center col-span-3 capitalized textGradient whitespace-nowrap ' + fugaz.className}>
          {selectedMonth}, {selectedYear}
        </p>
        <button onClick={() => handleIncrementMonth(+1)} className='ml-auto text-pink-400 text-lg sm:text-xl duration-200 hover:opacity-60'>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className='grid grid-cols-7 gap-1'>
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

                let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true
                let isToday = dayIndex === now.getDate()

                if (!dayDisplay) {
                  return (
                    <div className='bg-white' key={dayOfWeekIndex} />
                  )
                }

                let color = demo ? gradients.pink[baseRating[dayIndex]] :
                  dayIndex in data ? gradients.pink[data[dayIndex]] : 'white'

                return (
                  <div style={{ background: color }} className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' +
                    (isToday ? ' border-pink-400 ' : ' border-pink-100 ') +
                    (color === 'white' ? ' text-pink-400' : ' text-white')
                  } key={dayOfWeekIndex}>
                    <p>{dayIndex}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
