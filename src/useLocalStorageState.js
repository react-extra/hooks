import { useEffect, useRef, useState } from 'react'

export function useLocalStorageState(key, intialValue = '') {
  const [state, setState] = useState(() => {
    const localStorageValue = window.localStorage.getItem(key)
    if (localStorageValue) {
      return JSON.parse(localStorageValue)
    }
    return typeof intialValue === 'function' ? intialValue() : intialValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
      prevKeyRef.current = key
    }
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
