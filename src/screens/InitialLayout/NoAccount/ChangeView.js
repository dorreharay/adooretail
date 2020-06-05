import React, { useState, useEffect, useRef, } from 'react'
import { View, Text } from 'react-native'
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
      setTimeout(() => {
        setFadeChange(true)
      }, duration)
    } else {
      setTimeout(() => {
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
