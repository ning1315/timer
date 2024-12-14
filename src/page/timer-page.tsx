import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Layout } from '../components/layout/layout'
import { useTimer } from '../containers/use-timer'
dayjs.extend(duration)

const TimerPage = () => {
  const { isFetching, startTimer, timerDisplay, reminder } = useTimer()

  const handleStart = () => {
    startTimer()
  }

  const calculateProgress = () => {
    return ((timerDisplay.duration - reminder) / timerDisplay.duration) * 100
  }

  /** 남은 시간을 MM:SS 형식으로 변환 */
  const formatTime = (seconds: number): string => {
    if (seconds === 0) {
      return 'DONE'
    }
    return dayjs.duration(seconds, 'seconds').format('mm:ss')
  }

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        {timerDisplay.status === 'stopped' && (
          <button
            className="border-2 border-gray-black py-2 px-12 rounded-full font-mono cursor-pointer hover:bg-gray-300"
            onClick={handleStart}
          >
            {isFetching ? 'Loading...' : 'Start'}
          </button>
        )}
        {timerDisplay.status === 'running' && (
          <div className="relative w-full h-full">
            <div
              className="absolute inset-y-0 left-0 bg-gray-dark transition-all duration-1000"
              style={{
                width: `${calculateProgress()}%`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-mono">{formatTime(reminder)}</div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TimerPage
