import { useEffect, useRef, useState } from 'react'

export function useSessionStorageState(key, intialValue = '') {
  const [state, setState] = useState(() => {
    const sessionStorageValue = window.sessionStorage.getItem(key)
    if (sessionStorageValue) {
      return JSON.parse(sessionStorageValue)
    }
    return typeof intialValue === 'function' ? intialValue() : intialValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.sessionStorage.removeItem(prevKey)
      prevKeyRef.current = key
    }
    window.sessionStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
