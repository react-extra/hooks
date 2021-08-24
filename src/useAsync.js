//---
// hook imported from Kent c dodds's bookshelf repository
// https://github.com/kentcdodds/bookshelf
//--

import { useCallback, useReducer, useRef } from 'react'
import { useSafeDispatch } from './useSafeDispatch'

const defaultInitialState = { status: 'idle', data: null, error: null }

export function useAsync(initialState) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const [state, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = useCallback(
    (data) => safeSetState({ data, status: 'resolved' }),
    [safeSetState],
  )

  const setError = useCallback(
    (error) => safeSetState({ error, status: 'rejected' }),
    [safeSetState],
  )

  const reset = useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState],
  )

  const run = useCallback(
    async (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({ status: 'pending' })
      return promise.then(
        (data) => {
          setData(data)
          return data
        },
        (error) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  const { status, data, error } = state

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}
