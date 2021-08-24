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
- [useSafeDispatch](#usesafedispatch)

### useLocalStorageState

> This hook synchronize state with localStorage.

**Example**
```javascript
import { useLocalStorageState } from "@react-extra/hooks"

function Counter() {
  const [number, setNumber] = useLocalStorageState("number", 1)
  
  return <div>{number}</div>
}
```

### useSafeDispatch

> This hook prevent the call of the function on an unmounted component.

**Example**
```javascript
import { useSafeDispatch } from "@react-extra/hooks"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const safeSetIsLoading = useSafeDispatch(setIsLoading)

  useEffect(()=> {
    safeSetIsLoading(true)
    asyncFunction().finally(()=> safeSetIsLoading(false) )
  },[safeSetIsLoading])
  
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
[coverage-badge]:https://img.shields.io/codecov/c/github/react-extra/hooks?style=flat-square
[coverage]:https://codecov.io/gh/react-extra/hooks
<!-- links -->

