import { useState, useCallback, MutableRefObject } from 'react'

const useSafeState = (
  unmountRef: MutableRefObject<boolean>,
  defaultValue: any // eslint-disable-line
): any[] => {
  const [state, changeState] = useState(defaultValue)
  const wrapChangeState = useCallback(
    (value) => {
      if (!unmountRef.current) {
        changeState(value)
      }
    },
    [changeState, unmountRef]
  )

  return [state, wrapChangeState]
}

export default useSafeState
