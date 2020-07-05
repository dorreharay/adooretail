import React, { useState, useEffect, useRef, } from 'react'
import BackgroundTimer from 'react-native-background-timer';
import SharedFade from '@shared/SharedFade'

function ChangeView(props) {
  const { visible, duration, first, second } = props

  const initialRef = useRef(null)

  const [fadeChange, setFadeChange] = useState(false)

  useEffect(() => {
    if (!initialRef.current) {
      initialRef.current = true
      return
    }

    if (visible) {
      BackgroundTimer.setTimeout(() => {
        setFadeChange(true)
      }, duration)
    } else {
      BackgroundTimer.setTimeout(() => {
        setFadeChange(false)
      }, duration)
    }

    initialRef.current = true
  }, [visible])

  return (
    <>
      {fadeChange ? (
        <SharedFade visible={visible} direction="up" duration={duration}>
          {second}
        </SharedFade>
      ) : (
          <SharedFade visible={!visible} direction="up" duration={duration}>
            {first}
          </SharedFade>
        )}
    </>
  )
}

export default ChangeView
