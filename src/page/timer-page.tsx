import { useState } from 'react'
import { useEffect } from 'react'
import { Layout } from '../components/layout/layout'

const TimerPage = () => {
  const handleStart = () => {
    console.log('start')
  }

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <button
          className="border-2 border-gray-black py-2 px-12 rounded-full font-mono cursor-pointer hover:bg-gray-300"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
    </Layout>
  )
}

export default TimerPage
