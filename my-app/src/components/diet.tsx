'use client'

import React, { useState } from 'react'

const Diet = () => {

  const [date , setDate] = useState(new Date())
  return (
    <div className=' bg-gray bg-opacity-10 p-3 rounded-lg shadow-md mt-3 h-fit'>
      {/* <h2>{date.toDateString()}</h2> */}
      <h1>Enter your Meals and i'll make you remember</h1>
      <p>what did you eat today?</p>
    </div>
    
  )
}

export default Diet