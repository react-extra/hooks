//---
// hook imported from Kent c dodds's bookshelf repository
// https://github.com/kentcdodds/bookshelf
//--

import { useCallback, useLayoutEffect, useRef } from 'react'

export function useSafeDispatch(dispatch) {
  const mounted = useRef(false)
  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : undefined),
    [dispatch],
  )
}
