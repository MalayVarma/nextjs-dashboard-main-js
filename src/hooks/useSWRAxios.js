import useSWR from 'swr'
import axios from 'axios'


/**
 * `useSWR` wrapper with `axios` as fetcher.
 * Requires `fallbackData` for initial fetch.
 *
 * @param axiosRequest
 * @param axiosFallbackData
 */
export default function useSWRAxios(
  axiosRequest,
  axiosFallbackData,
) {
  const initFallbackData = {
    data: axiosFallbackData.data,
    headers: {},
    status: 200,
    statusText: 'Initial',
    config: {},
  }

  const fallbackData = { ...initFallbackData, ...axiosFallbackData }

  return useSWR(
    JSON.stringify(axiosRequest),
    () => axios.request(axiosRequest),
    {
      fallbackData,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.response?.status === 404) return

        // Only retry up to `maxRetry` times.
        const maxRetry = parseInt(process.env.NEXT_PUBLIC_API_MAX_RETRY ?? '5', 10)
        if (retryCount >= maxRetry) return

        // Retry after `retryInterval` seconds.
        const retryInterval = parseInt(process.env.NEXT_PUBLIC_API_RETRY_INTERVAL_IN_SECONDS ?? '5', 10)
        setTimeout(() => revalidate({ retryCount }), retryInterval * 1000)
      },
    },
  )
}

// Disable style for better reading.
// eslint-disable-next-line arrow-body-style
export const transformResponseWrapper = (transformer) => {
  return ([]).concat(
    axios.defaults.transformResponse,
    transformer,
  )
}
