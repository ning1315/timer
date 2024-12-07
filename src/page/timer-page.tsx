import { useState } from 'react'
import { useEffect } from 'react'
import { Layout } from '../components/layout/layout'

const TimerPage = () => {
  const [time, setTime] = useState(0)

  const handleStart = () => {
    setTime(time + 1)
  }

  const handleStop = () => {
    setTime(0)
  }

  const handleReset = () => {
    setTime(0)
  }

  const handlePause = () => {
    setTime(time)
  }

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time + 1)
      }, 1000)
    }
  }, [time])

  return (
    <Layout>
      <h1>timer</h1>
    </Layout>
  )
}

export default TimerPage
