import axios from 'axios'

const API_CONFIG = {
  url: 'https://23qle2bzdnqgtwdegesxodas6e0qzlzr.lambda-url.ap-northeast-2.on.aws',
  headers: {
    Authorization: 'nospoonhere',
  },
} as const

export const axiosInstance = axios.create({
  baseURL: API_CONFIG.url,
  headers: API_CONFIG.headers,
})
