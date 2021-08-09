import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalStorageState } from './useLocalStorageState'

describe('allow you to sync state with localStorage', () => {
  test('without initialValue', () => {
    const key = 'withoutIntialValue'
    const { result } = renderHook(() => useLocalStorageState(key))
    expect(result.current[0]).toEqual(
      JSON.parse(window.localStorage.getItem(key)),
    )
    expect(result.current[0]).toBeFalsy()
  })

  test('with initialValue as a function', () => {
    const key = 'withIntialValue as function'
    const data = 'function'
    const { result } = renderHook(() => useLocalStorageState(key, () => data))

    expect(result.current[0]).toEqual(
      JSON.parse(window.localStorage.getItem(key)),
    )
    expect(result.current[0]).toEqual(data)
  })

  test('with already a value in localSotrage', () => {
    const key = 'alreadLocalStorageValue'
    const data = 'has already a value'

    window.localStorage.setItem(key, JSON.stringify(data))

    const { result } = renderHook(() => useLocalStorageState(key))

    expect(result.current[0]).toEqual(
      JSON.parse(window.localStorage.getItem(key)),
    )
    expect(result.current[0]).toEqual(data)
  })

  test('with changing key', () => {
    let key = 'key-1'
    const data = 'data to sync'
    const { result, rerender } = renderHook(() =>
      useLocalStorageState(key, data),
    )

    expect(result.current[0]).toEqual(
      JSON.parse(window.localStorage.getItem(key)),
    )
    expect(result.current[0]).toEqual(data)

    key = 'key-2'
    rerender()
    expect(result.current[0]).toEqual(
      JSON.parse(window.localStorage.getItem(key)),
    )
    expect(result.current[0]).toEqual(data)
    expect(window.localStorage.getItem('key-1')).toEqual(null)
  })

  test('with changing of state', () => {
    const key = 'key-1'
    const data = 'data to sync'
    const { result } = renderHook(() => useLocalStorageState(key, data))

    expect(result.current[0]).toEqual(
      JSON.parse(window.localStorage.getItem(key)),
    )
    expect(result.current[0]).toEqual(data)

    const data2 = 'data changed'
    act(() => {
      result.current[1](data2)
    })
    expect(result.current[0]).toEqual(
      JSON.parse(window.localStorage.getItem(key)),
    )
    expect(result.current[0]).toEqual(data2)
  })
})
