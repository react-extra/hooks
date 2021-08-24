import { renderHook } from '@testing-library/react-hooks'
import { useSafeDispatch } from './useSafeDispatch'

function SayHello(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`hello ${name}`), 200)
  })
}

test('allow you to dispatch only if the hook is mounted ', async () => {
  const { result, unmount } = renderHook(() => useSafeDispatch(SayHello))
  expect(typeof result.current).toBe('function')

  const data = await result.current('youcef')
  expect(data).toBe('hello youcef')

  unmount()
  const data2 = result.current()
  expect(data2).toBe(undefined)
})
