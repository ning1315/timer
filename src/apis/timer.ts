import { axiosInstance } from './index'

/** API 설정 상수 */

type TimerResponse = {
  duration: string
}

export const getTimer = async (): Promise<TimerResponse> => {
  try {
    const { data } = await axiosInstance.get<TimerResponse>('/')
    return data
  } catch (err: unknown) {
    throw new Error(`타이머 데이터를 가져오는데 실패했습니다 ${err}`)
  }
}
