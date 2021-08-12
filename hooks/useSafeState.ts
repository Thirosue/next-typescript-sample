import { useState, useCallback } from 'react'

const useSafeState = (unmountRef, defaultValue) => {
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
