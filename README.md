<h1 align="center">React Hooks</h1>
<div align="center">
  <img alt="Hook" src="https://raw.githubusercontent.com/react-extra/hooks/main/hook.png" width="128">
</div>
<div align="center"><strong>Useful React Custom Hooks</strong></div>

<hr />

[![build-badge]][build]
[![coverage-badge]][coverage]
[![license-badge]][license]

## Setup

```bash
npm i @react-extra/hooks
```

## Hooks

- [useLocalStorageState](#uselocalstoragestate)
- [useSessionStorageState](#usesessionstoragestate)
- [useAsync](#useasync)
- [useSafeDispatch](#usesafedispatch)

### useLocalStorageState

> This hook synchronize state with localStorage.

**Example**

```javascript
import { useLocalStorageState } from '@react-extra/hooks'

function App() {
  const [state, setState] = useLocalStorageState(key, initialValue)
  ...
}
```
#### Parameters:
- `key`: localStorage key
- `initialValue`: the initial state to synchronize with the localStorage if the key doesn't exist there

### useSessionStorageState

> This hook synchronize state with sessionStorage.

**Example**

```javascript
import { useSessionStorageState } from '@react-extra/hooks'

function App() {
  const [state, setState] = useSessionStorageState(key, intialValue)
  ...
}
```
#### Parameters:
- `key`: sessionStorage key
- `initialValue`: the initial state to synchronize with the sessionStorage if the key doesn't exist there


### useAsync

```javascript
const {
  isIdle,
  isLoading,
  isError,
  isSuccess,
  setData,
  setError,
  error,
  status,
  data,
  run,
  reset,
} = useAsync(initialState)
```

> Allow you to call a `Promise` and set the `data` property with the result of the `Promise` once resolved, this hook indicates the status of the `Promise`

#### Parameters:

`initialState`: Optional object containing the initial state, by default it's value is `{ status: 'idle', data: null, error: null }`

#### Return Values:

`run(promise)`: a function that calls a `promise` passed in the first argument

`data`: contains the value returned by the `promise` after resolving

`error`: contains the error thrown by the `promise`

`isError`: a Boolean indicating if the `promise` rejected or not

`isSuccess`: a Boolean indicating if the `promise` succeeded or not

`isLoading`: a Boolean indicating if the `promise` is pending

`status`: a String indicating the status of the `promise` could be either 'idle', 'pending', 'rejected' or 'resolved'

`setData(data)`: a function that mutate the `data` property and set the `status` to 'resolved'

`setError(error)`: a function that mutate the `error` property and set the `status` to 'rejected'

`reset()`: a function that reset to `initialState`

**Example**

```javascript
import { useAsync } from '@react-extra/hooks'

function App() {
  const { data, error, status, run } = useAsync()
  React.useEffect(() => {
    run(fetchSomeUrl())
  }, [])
  if (error) {
    return <ErrorComponent />
  }
  if (status === 'pending') {
    return <LoadingComponent />
  }
  if (status === 'resolved') {
    return <div>{data}</div>
  }
}
```

### useSafeDispatch

> This hook prevent the call of the function on an unmounted component.

**Example**

```javascript
import { useSafeDispatch } from '@react-extra/hooks'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const safeSetIsLoading = useSafeDispatch(setIsLoading)

  useEffect(() => {
    safeSetIsLoading(true)
    asyncFunction().finally(() => safeSetIsLoading(false))
  }, [safeSetIsLoading])

  return <div>{String(isLoading)}</div>
}
```

In the example above if the **App** is unmounted before **asyncFunction** is finished its execution the **safeSetIsLoading** will not call the **setIsLoading** witch allows to avoid the error of:

```diff
- Warning: Can't perform a React state update on an unmounted component.
- This is a no-op, but it indicates a memory leak in your application.
- To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function`.
```

<!-- links -->

[build]: https://github.com/react-extra/hooks/actions/workflows/cd.yml
[build-badge]: https://img.shields.io/github/workflow/status/react-extra/hooks/cd?style=flat-square
[license]: https://github.com/react-extra/hooks/blob/main/LICENSE
[license-badge]: https://img.shields.io/github/license/react-extra/hooks?color=blue&style=flat-square
[coverage-badge]: https://img.shields.io/codecov/c/github/react-extra/hooks?style=flat-square
[coverage]: https://codecov.io/gh/react-extra/hooks

<!-- links -->
