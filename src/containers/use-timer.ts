import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, useRef } from 'react'
import { getTimer } from '../apis/timer'

interface TimerDisplay {
  duration: number
  status: 'running' | 'stopped'
}

export const useTimer = () => {
  const queryClient = useQueryClient()
  const [timerDisplay, setTimerDisplay] = useState<TimerDisplay>({ duration: 0, status: 'stopped' })
  const [reminder, setReminder] = useState(0)

  // 타이머 관련 참조
  const startTimeRef = useRef<number>(0)
  const backgroundStartTimeRef = useRef<number>(0)

  const {
    data,
    isFetching,
    refetch: fetchTimer,
  } = useQuery({
    queryKey: ['timer'],
    queryFn: getTimer,
    enabled: false,
  })

  const startTimer = () => {
    fetchTimer().then((res) => {
      const duration = res?.data?.duration
      if (duration) {
        const [minutes, seconds] = duration.split(':').map((v) => Number(v))
        const totalSeconds = minutes * 60 + seconds

        setTimerDisplay({ duration: totalSeconds, status: 'running' })
        setReminder(totalSeconds)

        // 시작 시간 설정
        startTimeRef.current = Date.now()
      }
    })
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const handleVisibilityChange = () => {
      if (document.hidden && timerDisplay.status === 'running') {
        // 백그라운드로 전환된 시간 기록
        backgroundStartTimeRef.current = Date.now()
      } else if (!document.hidden && timerDisplay.status === 'running') {
        if (backgroundStartTimeRef.current) {
          // 백그라운드에 있던 시간 계산
          const backgroundDuration = (Date.now() - backgroundStartTimeRef.current) / 1000

          // 5초 이상 백그라운드에 있었다면 타이머 초기화
          if (backgroundDuration > 5) {
            setTimerDisplay({ duration: 0, status: 'stopped' })
            setReminder(0)
            queryClient.invalidateQueries({ queryKey: ['timer'] })
            backgroundStartTimeRef.current = 0
            return
          }
          // 백그라운드 시간만큼 시작 시간 조정
          startTimeRef.current += Math.floor(backgroundDuration) * 1000
          backgroundStartTimeRef.current = 0
        }
      }
    }

    // 타이머 실행 로직
    if (timerDisplay.status === 'running' && reminder > 0) {
      intervalId = setInterval(() => {
        // 실제 경과 시간 계산
        const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000)
        const remainingTime = Math.max(0, timerDisplay.duration - elapsedTime)

        setReminder(remainingTime)

        // 타이머 종료 시 상태 초기화
        if (remainingTime === 0) {
          setTimerDisplay({ duration: 0, status: 'stopped' })
          clearInterval(intervalId)
          queryClient.invalidateQueries({ queryKey: ['timer'] })
        }
      }, 1000)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [timerDisplay.status, reminder, queryClient])

  return { data, isFetching, startTimer, timerDisplay, reminder }
}
